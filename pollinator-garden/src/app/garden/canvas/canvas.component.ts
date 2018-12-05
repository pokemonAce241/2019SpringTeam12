import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlantInstance, InstanceService } from 'src/app/services/instance.service';
import { CanvasTransitionService } from 'src/app/services/canvas-transition.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
  providers: [InstanceService]
})
export class CanvasComponent implements OnInit {

  // index to the html canvas object
  @ViewChild('canvasEl') canvasEl: ElementRef;
  // image dimensions
  private imgDims: any;
  // plant images
  private canvasPlants: any;
  // current index of the plant that is selected
  private index: any;
  // amount of plants that should be on the canvas
  private size: any;
  // Plant properties from the API
  plant_instances: PlantInstance[];
  // which garden to load
  garden = { "id": 2 };

  /** Canvas 2d context */
  private context: CanvasRenderingContext2D;

  constructor(
    private router: Router,
    private instanceService: InstanceService,
    private canvasService: CanvasTransitionService,
  ) {
    this.imgDims = [];
    this.canvasPlants = [];
    this.index = 0;
    this.size = 0;
  }

  ngAfterViewInit() {
    //get the canvas
    let canvas = document.getElementById('canvas') as HTMLCanvasElement;
    // size the canvas to fill the div 
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    // have the height and width attributes match the style (1:1)
    canvas.height = canvas.offsetHeight;
    canvas.width = canvas.offsetWidth;
    // gets the canvas coordinates (rectangle)
    let rect = canvas.getBoundingClientRect();
    //instantiate a context based on the canvas
    this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');

    // if window is adjusted then adjust images on screen
    window.addEventListener("resize", (ev) => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      if (this.imgDims[this.index] !== undefined) {
        if (Number.isNaN(this.imgDims[this.index].xRel) || Number.isNaN(this.imgDims[this.index].yRel)) {
          this.imgDims[this.index].xRel = this.imgDims[this.index].x / canvas.width;
          this.imgDims[this.index].yRel = this.imgDims[this.index].y / canvas.height;
        }
        //update the new position based on the relative position
        this.imgDims[this.index].x = this.imgDims[this.index].xRel * canvas.width;
        this.imgDims[this.index].y = this.imgDims[this.index].yRel * canvas.height;
      }
      this.context.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < this.size; i++) {
        this.context.drawImage(this.canvasPlants[i].img, this.imgDims[i].x, this.imgDims[i].y, 100, 100);
      }
    });

    // one of two click event listeners (performs operations on garden canvas)
    document.addEventListener('click', (ev) => {
      // rect is the rectangle boundary of the canvas
      // client is mouse position on the client screen
      // x and y is the location within the canvas
      rect = canvas.getBoundingClientRect();
      var x = ev.clientX - rect.left;
      var y = ev.clientY - rect.top;

      // if within the garden canvas and toggled then update the current index image information
      if (this.imgDims !== undefined &&
        (x > 0 && x < canvas.width) &&
        (y > 0 && y < canvas.height) &&
        this.canvasService.isToggled() && !this.canvasService.isPlantCanvas()) {
        this.imgDims[this.index].x = x - this.imgDims[this.index].width * .5;
        this.imgDims[this.index].y = y - this.imgDims[this.index].height * .5;
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < this.size; i++) {
          this.context.drawImage(this.canvasPlants[i].img, this.imgDims[i].x, this.imgDims[i].y, 100, 100);
        }
        this.canvasService.toggleSelected();
      } else if (this.imgDims[this.index] !== undefined && !this.canvasService.isToggled()) { //otherwise then selecting image at location (index becomes image index)
        for (var i = 0; i < this.size; i++) {
          if ((x > this.imgDims[i].x && x < this.imgDims[i].x + this.imgDims[i].width) &&
            (y > this.imgDims[i].y && y < this.imgDims[i].y + this.imgDims[i].height) &&
            !this.canvasService.isPlantCanvas()) {
            this.index = i;
            this.canvasService.toggleSelected();
          }
        }
      } else if ((x < 0 || x > canvas.width || y < 0 || y > canvas.height) && !this.canvasService.isPlantCanvas()) { //if not in garden canvas and toggle display error message
        this.canvasService.decrementSize();
        this.canvasService.toggleSelected();
      }

      // unselected send signal back to plantlist canvas to reset itself
      if (!this.canvasService.isToggled() && !this.canvasService.isPlantCanvas()) {
        this.canvasService.toggleReset();
      }
    });

    // one of two mousemove event listeners (performs operations on the garden canvas)
    document.addEventListener('mousemove', (ev) => {
      rect = canvas.getBoundingClientRect();
      let x = ev.clientX - rect.left;
      let y = ev.clientY - rect.top;

      //async method below that gets the size and evaluates whether to instantiate a new plant object
      this.addNew().then(() => {
        // if the first time with the increased size then initialized
        if (this.canvasService.isInitialize()) {
          this.index = this.size - 1;          // from async method
          this.canvasPlants[this.index] = {};  // sets the new plant
          this.canvasPlants[this.index].img = new Image();
          this.imgDims[this.index] = {};       //sets the plant properties
          this.imgDims[this.index].width = 100;
          this.imgDims[this.index].height = 100;
          this.imgDims[this.index].xRel = NaN;
          this.imgDims[this.index].yRel = NaN;
          this.canvasService.toggleInitialize(); //marks it as intialized
        }

        // do not change x > 1 weird coincidence where last equals equivalent
        // sets current index to the current position
        if (this.imgDims[this.index] !== undefined && this.canvasService.isToggled() && x > 1) {
          this.imgDims[this.index].x = x - this.imgDims[this.index].width * .5;
          this.imgDims[this.index].y = y - this.imgDims[this.index].height * .5;
        }

        // sets the image of the plant if not set
        if (this.canvasPlants[this.index] !== undefined && this.canvasPlants[this.index].img.src === '' && !this.canvasService.isPlantCanvas()) {
          var image = new Image(); //width and height parameter optional
          image.src = this.canvasService.getImg();
          this.canvasPlants[this.index].img = image;
        }

        // do not change x < -50 (anomoly)
        // checks to see if the image crosses over the canvas boundary
        if (this.imgDims[this.index] !== undefined && x < -50 && !this.canvasService.isPlantCanvas()) {
          this.canvasService.setImg('');     //reset image
          this.canvasService.toggleCanvas(); //update active canvas
          if (this.canvasService.isToggled() && this.index === this.size - 1) {
            this.canvasPlants[this.index].img = new Image();
            this.canvasService.decrementSize();
          }
          this.context.clearRect(0, 0, canvas.width, canvas.height);
          for (var i = 0; i < this.canvasService.getSize(); i++) {
            this.context.drawImage(this.canvasPlants[i].img, this.imgDims[i].x, this.imgDims[i].y, 100, 100);
          }
        } else if (this.imgDims[this.index] === undefined && x < 0 && !this.canvasService.isPlantCanvas()) { // if not set then ignore crossing over boundary
          this.canvasService.toggleCanvas();
        } else if (this.canvasService.isToggled() && !this.canvasService.isPlantCanvas()) { // update and draw canvas with new coordinates of image
          this.context.clearRect(0, 0, canvas.width, canvas.height);
          for (var i = 0; i < this.size; i++) {
            this.context.drawImage(this.canvasPlants[i].img, this.imgDims[i].x, this.imgDims[i].y, 100, 100);
          }
        }
      });
    });

  }

  ngOnInit() {
  }

  public goToShoppingList(): void {
    this.router.navigate(['/shopping-list']);
  }

  // async method calls getSize helper method to get size from plantlist canvas (race condition)
  async addNew() {
    await this.getSize().then((size) => {
      this.size = size;
    });
  }

  // promise that gets size from the service and updates variable in the garden canvas (wait 10 microsec)
  private getSize(): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.canvasService.getSize());
      }, 10);
    });
  }
}

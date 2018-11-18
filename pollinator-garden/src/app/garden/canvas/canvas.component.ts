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

  @ViewChild('canvasEl') canvasEl: ElementRef;
  private imgDim;
  private canvasPlant;
  plant_instances: PlantInstance[];
  garden = {"id": 2};
  
  /** Canvas 2d context */
  private context: CanvasRenderingContext2D;

  constructor(
    private router: Router,
    private instanceService: InstanceService,
    private canvasService: CanvasTransitionService,
  ) { 
    this.imgDim = {};
    this.imgDim.width = 100;
    this.imgDim.height = 100;
    this.imgDim.xRel = NaN;
    this.imgDim.yRel = NaN;
    this.canvasPlant = {};
    this.canvasPlant.img = new Image();
  }

  ngAfterViewInit() { 
    let canvas = document.getElementById('canvas') as HTMLCanvasElement;
    canvas.style.width ='100%';
    canvas.style.height='100%';
    canvas.height = canvas.offsetHeight;
    canvas.width = canvas.offsetWidth;
    let rect = canvas.getBoundingClientRect();
    this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');

    window.addEventListener("resize", (ev) => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      if(Number.isNaN(this.imgDim.xRel) || Number.isNaN(this.imgDim.yRel)) {
        this.imgDim.xRel = this.imgDim.x / canvas.width;
        this.imgDim.yRel = this.imgDim.y / canvas.height;
      }
      this.imgDim.x = this.imgDim.xRel * canvas.width;
      this.imgDim.y = this.imgDim.yRel * canvas.height;
      this.context.clearRect(0, 0, canvas.width, canvas.height);
      this.context.drawImage(this.canvasPlant.img, this.imgDim.x, this.imgDim.y, 100, 100);
    });

    document.addEventListener('click', (ev) => {

      rect = canvas.getBoundingClientRect();
      var x = ev.clientX - rect.left;
      var y = ev.clientY - rect.top;
      if ((x > 0 && x < canvas.width) &&
      (y > 0 && y < canvas.height) &&
      this.canvasService.isToggled() && !this.canvasService.isPlantCanvas()) {
          this.imgDim.x = x - this.imgDim.width * .5;
          this.imgDim.y = y - this.imgDim.height * .5;
          this.context.clearRect(0, 0, canvas.width, canvas.height);
          this.context.drawImage(this.canvasService.getImg(), this.imgDim.x, this.imgDim.y, 100, 100);
          this.canvasService.toggleSelected();
      } else if ((x > this.imgDim.x && x < this.imgDim.x + this.imgDim.width) &&
      (y > this.imgDim.y && y < this.imgDim.y + this.imgDim.height) &&
      !this.canvasService.isToggled() && !this.canvasService.isPlantCanvas()) {
        this.canvasService.toggleSelected();
      } else if ((x < 0 || x > canvas.width || y < 0 || y > canvas.height) && !this.canvasService.isPlantCanvas()) {
        alert('Not within canvas.\nPlease try again.');
      }
    });

    document.addEventListener('mousemove', (ev) => {
      rect = canvas.getBoundingClientRect();
      var x = ev.clientX - rect.left;
      var y = ev.clientY - rect.top;

      this.imgDim.x = x - this.imgDim.width * .5;
      this.imgDim.y = y - this.imgDim.height * .5;
      if (x < 0 && !this.canvasService.isPlantCanvas()) {
        this.canvasPlant.img = this.canvasService.getImg();
        this.canvasService.setImg(new Image());
        this.canvasService.toggleCanvas();
      } else if(this.canvasService.isToggled() && !this.canvasService.isPlantCanvas()) {
        this.context.clearRect(0,0,canvas.width, canvas.height);
        this.context.drawImage(this.canvasService.getImg(), this.imgDim.x, this.imgDim.y, 100, 100);
      } else if(this.canvasService.isToggled() && this.canvasService.isPlantCanvas()) {
        this.context.clearRect(0,0,canvas.width, canvas.height);
      }
    });

  }

  ngOnInit() {
    //this.getPlantInstances();
  }

  private draw() {
      // this.plant_instances.forEach(instance => {
      //   var img = new Image();
      //   img.src = instance.front_image_path;

      //   img.onload = () => {
      //     this.context.drawImage(img, instance.x, instance.y, 100, 100);
      //   }
      // })
  }

  public goToShoppingList(): void {
    this.router.navigate(['/shopping-list']);
  }

  // getPlantInstances() {
  //   this.instanceService.getInstances(this.garden.id)
  //     .subscribe(res => {
  //       console.log(res);
  //       this.plant_instances = res;
  //       this.draw();

  //     })
  // }
}

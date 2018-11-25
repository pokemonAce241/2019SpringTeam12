import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstanceService } from 'src/app/services/instance.service';
import { CanvasTransitionService } from 'src/app/services/canvas-transition.service';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css'],
})

export class PlantListComponent implements OnInit {

  // index to the html canvas object
  @ViewChild('canvasEl') canvasEl: ElementRef;

  /** Canvas 2d context */
  private context: CanvasRenderingContext2D;
  // image dimensions
  private imgDims: any;
  // plant images
  private img: HTMLImageElement;
  // reset the canvas to original
  private reset: boolean;

  constructor(private canvasService: CanvasTransitionService,
  ) {
    this.imgDims = [];
    this.img = new Image();
  }

  ngAfterViewInit() {

    let canvas = document.getElementById('plant-list-canvas') as HTMLCanvasElement;
    // size the canvas to fill the div 
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    // have the height and width attributes match the style (1:1)
    canvas.height = canvas.offsetHeight + 500;
    canvas.width = canvas.offsetWidth;
    // gets the canvas coordinates (rectangle)
    let rect = canvas.getBoundingClientRect();
    //instantiate a context based on the canvas
    this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');

    window.addEventListener("resize", (ev) => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      this.imgDims[0].x = this.imgDims[0].xRel * canvas.width;
      this.imgDims[0].y = this.imgDims[0].yRel * canvas.height + 500;
      this.context.clearRect(0, 0, canvas.width, canvas.height);
      this.context.drawImage(this.img, this.imgDims[0].x, this.imgDims[0].y, 100, 100);
    });

    document.addEventListener('click', (ev) => {
      // async method below that gets whether to reset the canvas
      this.updateReset().then(() => {
        // if reset then restore image back to original dimensions
        if (this.reset) {
          this.canvasService.toggleReset();
          this.imgDims[0].x = this.imgDims[0].ox;
          this.imgDims[0].y = this.imgDims[0].oy;
          this.context.drawImage(this.img, this.imgDims[0].x, this.imgDims[0].y, 100, 100);
        }

        rect = canvas.getBoundingClientRect();
        var x = ev.clientX - rect.left;
        var y = ev.clientY - rect.top;

        // if not selected and clicked then toggle and break
        if ((x > this.imgDims[0].x && x < this.imgDims[0].x + this.imgDims[0].width) &&
          (y > this.imgDims[0].y && y < this.imgDims[0].y + this.imgDims[0].height) &&
          !this.canvasService.isToggled() && this.canvasService.isPlantCanvas()) {
          this.canvasService.toggleSelected();
          return;
        }

        if (this.canvasService.isToggled() && this.canvasService.isPlantCanvas()) {
          alert('Not within canvas.\nPlease try again.');
        }
      });
    });

    document.addEventListener('mousemove', (ev) => {
      rect = canvas.getBoundingClientRect();
      var x = ev.clientX - rect.left;
      var y = ev.clientY - rect.top;
      // console.log('this is the image in the plantlist: ' + this.canvasService.getImg());
      // image selected and crossing boundary pass information
      if (this.canvasService.getImg() === '' && this.canvasService.isToggled() && this.canvasService.isPlantCanvas() && x > canvas.width && y > 0 && y < canvas.height) {
        this.canvasService.incrementSize();
        this.canvasService.toggleCanvas();
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        this.canvasService.toggleInitialize();
        this.canvasService.setImg(this.img.src);
      } else if (this.canvasService.getImg() === '' && this.canvasService.isPlantCanvas() && x > canvas.width && y > 0 && y < canvas.height) { // if no image then still signal change of canvas
        this.canvasService.toggleCanvas();
      } else if (this.canvasService.isToggled() && this.canvasService.isPlantCanvas()) { // otherwise in canvas still so update and draw
        this.imgDims[0].x = x - this.imgDims[0].width * .5;
        this.imgDims[0].y = y - this.imgDims[0].height * .5;
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        this.context.drawImage(this.img, this.imgDims[0].x, this.imgDims[0].y, 100, 100);
      }
    });
  }

  ngOnInit() {
    this.img.src = "https://www.fiftyflowers.com/site_files/FiftyFlowers/Image/Product/peony-sarah-bernhardt-bloom-500_b572106d.jpg";
    this.img.onload = () => {
      // get canvas for width
      let canvas = document.getElementById('plant-list-canvas') as HTMLCanvasElement;
      // gets the line # for plants
      var line = 0;
      // margin percentage
      let marginP = .1;
      // margin that surround the image on both sides (based on margin percentage)
      var margin = canvas.width * marginP;
      // size of the image  (left over dimensions)
      var size = canvas.width * ((1 - 3*marginP)/2);
      // depending on the screen size this can be very big image (max size 100)
      if(size > 100) {
        size = 100
        margin = (canvas.width - 200)/3;
      }
      // go through images
      for (var i = 0; i < 10; i++) {
        // if the image is mod 0 then begin pic on line
        if(i % 2 === 0) {
          this.imgDims[i] = {};
          // x is just the margin off
          this.imgDims[i].ox = margin;
          // y depends on the line size
          this.imgDims[i].oy = 10 + line*(size + 10);
          this.context.drawImage(this.img, this.imgDims[i].ox, this.imgDims[i].oy, size, size);
          this.imgDims[i].x = this.imgDims[i].ox;
          this.imgDims[i].y = this.imgDims[i].oy;
          this.imgDims[i].width = size;
          this.imgDims[i].height = size;
          let canvas = document.getElementById('plant-list-canvas') as HTMLCanvasElement;
          this.imgDims[i].xRel = this.imgDims[i].x / canvas.width;
          this.imgDims[i].yRel = this.imgDims[i].y / canvas.height;
        } else {
          this.imgDims[i] = {};
          // margin image margin = x location
          this.imgDims[i].ox = 2*margin + size;
          this.imgDims[i].oy = 10 + line*(size + 10);
          this.context.drawImage(this.img, this.imgDims[i].ox, this.imgDims[i].oy, size, size);
          this.imgDims[i].x = this.imgDims[i].ox;
          this.imgDims[i].y = this.imgDims[i].oy;
          this.imgDims[i].width = size;
          this.imgDims[i].height = size;
          let canvas = document.getElementById('plant-list-canvas') as HTMLCanvasElement;
          this.imgDims[i].xRel = this.imgDims[i].x / canvas.width;
          this.imgDims[i].yRel = this.imgDims[i].y / canvas.height;
          // line complete so increment for the next line
          line++;
        }
      }
    }
  }

  // async method calls getReset helper method to decide to reset (race condition)
  async updateReset() {
    await this.getReset().then((reset) => {
      this.reset = reset;
    });
  }

  // promise that gets size from the service and updates variable in the plantlist canvas (wait 50 microsec)
  private getReset(): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.canvasService.isReset());
      }, 50);
    });
  }
}

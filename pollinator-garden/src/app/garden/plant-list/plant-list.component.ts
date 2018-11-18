import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstanceService } from 'src/app/services/instance.service';
import { CanvasTransitionService } from 'src/app/services/canvas-transition.service';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css']
})

export class PlantListComponent implements OnInit {

  @ViewChild('canvasEl') canvasEl: ElementRef;

  /** Canvas 2d context */
  private context: CanvasRenderingContext2D;
  private imgDim: any;
  private img: HTMLImageElement;

  constructor(private canvasService: CanvasTransitionService,
  ) {
    this.imgDim = {};
    this.img = new Image();
  }

  ngAfterViewInit() {
    let canvas = document.getElementById('plant-list-canvas') as HTMLCanvasElement;
    let parent = document.getElementById('canvasContainer') as HTMLDivElement;
    canvas.height = parent.offsetHeight + 500;
    canvas.width = parent.offsetWidth;
    let rect = canvas.getBoundingClientRect();
    this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');

    window.addEventListener("resize", (ev) => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight + 500;
      this.imgDim.x = this.imgDim.xRel * canvas.width;
      this.imgDim.y = this.imgDim.yRel * canvas.height;
      this.context.clearRect(0, 0, canvas.width, canvas.height);
      this.context.drawImage(this.img, this.imgDim.x, this.imgDim.y, 100, 100);
    });

    document.addEventListener('click', (ev) => {

      if(this.canvasService.isFail()) {

      }

      rect = canvas.getBoundingClientRect();
      var x = ev.clientX - rect.left;
      var y = ev.clientY - rect.top;
      if ((x > this.imgDim.x && x < this.imgDim.x + this.imgDim.width) &&
        (y > this.imgDim.y && y < this.imgDim.y + this.imgDim.height) &&
        !this.canvasService.isToggled() && this.canvasService.isPlantCanvas()) {
        this.canvasService.toggleSelected();
        return;
      }

      if (this.canvasService.isToggled() && this.canvasService.isPlantCanvas())  {
          alert('Not within canvas.\nPlease try again.');

        }
    });

    document.addEventListener('mousemove', (ev) => {
      rect = canvas.getBoundingClientRect();
      var x = ev.clientX - rect.left;
      var y = ev.clientY - rect.top;
      if (this.canvasService.getImg().src === '' && this.canvasService.isToggled() && this.canvasService.isPlantCanvas() && x > canvas.width && y > 0 && y < canvas.height) {
        this.canvasService.setImg(this.img);
        this.canvasService.toggleCanvas();
        this.context.clearRect(0, 0, canvas.width, canvas.height);
      } else {
        if (this.canvasService.isToggled()) {
          this.imgDim.x = x - this.imgDim.width * .5;
          this.imgDim.y = y - this.imgDim.height * .5;
          this.context.clearRect(0, 0, canvas.width, canvas.height);
          this.context.drawImage(this.img, this.imgDim.x, this.imgDim.y, 100, 100);
        }
      }
    })
  }

  ngOnInit() {
    this.img.src = "https://www.fiftyflowers.com/site_files/FiftyFlowers/Image/Product/peony-sarah-bernhardt-bloom-500_b572106d.jpg";
    this.img.onload = () => {
      this.context.drawImage(this.img, 10, 10, 100, 100);
      this.imgDim.x = 10;
      this.imgDim.y = 10;
      this.imgDim.width = 100;
      this.imgDim.height = 100;
      let canvas = document.getElementById('plant-list-canvas') as HTMLCanvasElement;
      this.imgDim.xRel = this.imgDim.x / canvas.width;
      this.imgDim.yRel = this.imgDim.y / canvas.height;
    }
  }
}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstanceService } from 'src/app/services/instance.service';

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
  private toggle: boolean;
  private img: HTMLImageElement;
  private active: boolean;

  constructor(
  ) {
    this.imgDim = {};
    this.img = new Image();
    this.toggle = false;
    this.active = true;
  }

  ngAfterViewInit() { 
    let canvas = document.getElementById('plant-list-canvas') as HTMLCanvasElement;
    canvas.height = 500;
    this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');
    document.addEventListener('click', (ev) => {
      if((ev.x > this.imgDim.x && ev.x < this.imgDim.x + this.imgDim.width) &&
          (ev.y - 200 > this.imgDim.y && ev.y - 200 < this.imgDim.y + this.imgDim.width) &&
          !this.toggle) {
            this.toggle = !this.toggle;
            console.log(this.toggle);
            return;
          }

      if(this.toggle) {
        if(ev.x < canvas.width && ev.x > 0 && ev.y - 200 > 0 && ev.y - 200 < canvas.height) {
        this.imgDim.x = ev.x - this.imgDim.width * .5;
        this.imgDim.y = ev.y - 200 - this.imgDim.height * .5;
        this.context.clearRect(0,0,canvas.width, canvas.height);
        this.context.drawImage(this.img, this.imgDim.x, this.imgDim.y, 100, 100);
        this.toggle = !this.toggle;
        console.log(this.toggle);
        } else {
          this.context.clearRect(0,0,canvas.width, canvas.height);
          alert("Invalid location.\nPlease try again.");
          this.context.drawImage(this.img, 10, 10, 100, 100);
          this.toggle = !this.toggle;
          console.log(this.toggle);
        }
      }
    });

    canvas.onmousemove = (ev) => {
      if(this.toggle) {
        this.context.clearRect(0,0,canvas.width, canvas.height);
        this.context.drawImage(this.img, ev.x - this.imgDim.width * .5, ev.y - 200 - this.imgDim.height * .5, 100, 100);
      }
    }
  }

  ngOnInit() {
    this.img.src = "https://www.fiftyflowers.com/site_files/FiftyFlowers/Image/Product/peony-sarah-bernhardt-bloom-500_b572106d.jpg";
    this.img.onload = () => {
      this.context.drawImage(this.img, 10, 10, 100, 100);
      this.imgDim.x = 10;
      this.imgDim.y = 10;
      this.imgDim.width = 100;
      this.imgDim.height = 100;
      // console.log(this.imgDim);
    }
  }
}

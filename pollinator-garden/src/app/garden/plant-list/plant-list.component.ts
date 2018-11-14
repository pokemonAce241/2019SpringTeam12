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
  // private toggle: boolean;
  // @Output() imgEmitter: EventEmitter<any> = new EventEmitter<any>();
  private img: HTMLImageElement;
  // private active: boolean;

  constructor(private canvasService: CanvasTransitionService,
  ) {
    this.imgDim = {};
    this.img = new Image();
    // this.toggle = false;
    // this.active = true;
  }

  ngAfterViewInit() {
    let canvas = document.getElementById('plant-list-canvas') as HTMLCanvasElement;
    let parent = document.getElementById('canvasContainer') as HTMLDivElement;
    canvas.height = parent.offsetHeight + 500;
    canvas.width = parent.offsetWidth;
    this.canvasService.setDivider(canvas.width);
    let rect = canvas.getBoundingClientRect();
    this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');

    window.addEventListener("resize", (ev) => {
      canvas.width = parent.offsetWidth;
      this.canvasService.setDivider(canvas.width);
      canvas.height = parent.offsetHeight + 500;
      this.imgDim.x = this.imgDim.xRel * canvas.width;
      this.imgDim.y = this.imgDim.yRel * canvas.height;
      this.context.clearRect(0, 0, canvas.width, canvas.height);
      this.context.drawImage(this.img, this.imgDim.x, this.imgDim.y, 100, 100);
    });

    document.addEventListener('click', (ev) => {

      rect = canvas.getBoundingClientRect();
      var x = ev.clientX - rect.left;
      var y = ev.clientY - rect.top;
      // console.log(x + ' ' + y +  ' ' + this.imgDim.x + ' ' + this.imgDim.width + ' ' + this.imgDim.y + ' ' +  this.imgDim.height + ' ' + this.canvasService.isToggled());
      if ((x > this.imgDim.x && x < this.imgDim.x + this.imgDim.width) &&
        (y > this.imgDim.y && y < this.imgDim.y + this.imgDim.height) &&
        !this.canvasService.isToggled() && this.canvasService.isPlantCanvas()) {
        this.canvasService.toggleSelected();
        // console.log(this.canvasService.isToggled());
        return;
      }

      if (this.canvasService.isToggled() && this.canvasService.isPlantCanvas())  {
        // if (y > 0 && y < canvas.height) {
          this.imgDim.x = x - this.imgDim.width * .5;
          this.imgDim.y = y - this.imgDim.height * .5;
          this.imgDim.xRel = this.imgDim.x / canvas.width;
          this.imgDim.yRel = this.imgDim.y / canvas.height;
          this.context.clearRect(0, 0, canvas.width, canvas.height);
          this.context.drawImage(this.img, this.imgDim.x, this.imgDim.y, 100, 100);
          this.canvasService.toggleSelected();
          // console.log(this.canvasService.isToggled());
        // } else {
        //   this.context.clearRect(0, 0, canvas.width, canvas.height);
        //   alert("Invalid location.\nPlease try again.");
        //   this.context.drawImage(this.img, 10, 10, 100, 100);
        //   this.canvasService.toggleSelected();
        //   this.imgDim.x = 10;
        //   this.imgDim.y = 10;
          // console.log(this.canvasService.isToggled());
        // }
      }
    });

    document.addEventListener('mousemove', (ev) => {
      rect = canvas.getBoundingClientRect();
      var x = ev.clientX - rect.left;
      var y = ev.clientY - rect.top;
      // console.log(y + ' ' + (parent.clientHeight - canvas.height) + ' ' + parent.offsetHeight + ' ' + canvas.height);
      // console.log(x + ' ' + y + ' ' + canvas.width + ' ' + canvas.height + ' ' + this.canvasService.getImg().src);
      console.log('x: ' + x + ' divider: ' + this.canvasService.getDivider());
      if (this.canvasService.getImg().src === '' && this.canvasService.isToggled() && x > canvas.width && y > 0 && y < canvas.height) {
        this.canvasService.setImg(this.img);
        this.canvasService.toggleCanvas();
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        //console.log(this.canvasService.isPlantCanvas());
      } else {
        // this.context.strokeStyle = '#f00';  // some color/style
        // this.context.lineWidth = 2;         // thickness
        // console.log('mouse x coordinate: ' + x + ' mouse y coordinate: ' + y );
        if (this.canvasService.isToggled()) {
          this.imgDim.x = x - this.imgDim.width * .5;
          this.imgDim.y = y - this.imgDim.height * .5;
          this.context.clearRect(0, 0, canvas.width, canvas.height);
          this.context.drawImage(this.img, this.imgDim.x, this.imgDim.y, 100, 100);
          // this.context.strokeRect(this.imgDim.x, this.imgDim.y, 100, 100);
        }
      }
    })

    // canvas.onmousemove = (ev) => {
    //   rect = canvas.getBoundingClientRect();
    //   var x = ev.clientX - rect.left;
    //   var y = ev.clientY - rect.top;
    //   console.log(x + ' ' + y + ' ' + canvas.width + ' ' + canvas.height);
    //   if(x > canvas.width && y > 0 && y < canvas.height) {
    //     this.canvasService.setImg(this.img);
    //     this.canvasService.toggleCanvas();
    //     console.log(this.canvasService.isPlantCanvas())
    //   }
    //   // this.context.strokeStyle = '#f00';  // some color/style
    //   // this.context.lineWidth = 2;         // thickness
    //   this.imgDim.x = x - this.imgDim.width * .5;
    //   this.imgDim.y = y - this.imgDim.height * .5;
    //   // console.log('mouse x coordinate: ' + x + ' mouse y coordinate: ' + y );
    //   if(this.canvasService.isToggled()) {
    //     this.context.clearRect(0,0,canvas.width, canvas.height);
    //     this.context.drawImage(this.img, this.imgDim.x, this.imgDim.y, 100, 100);
    //     // this.context.strokeRect(this.imgDim.x, this.imgDim.y, 100, 100);
    //   }
    // }
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

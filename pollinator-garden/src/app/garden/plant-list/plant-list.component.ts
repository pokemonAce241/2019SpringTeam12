import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstanceService } from 'src/app/services/instance.service';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css'],
  // host: { '(click)': 'onMouseClick($event)'}
})
export class PlantListComponent implements OnInit {

  @ViewChild('canvasEl') canvasEl: ElementRef;

  /** Canvas 2d context */
  private context: CanvasRenderingContext2D;

  // plants: Plant[];
  private img: HTMLImageElement;
  private state: any;

  constructor(
    // private router: Router,
    // private instanceService: InstanceService
  ) { }

  ngAfterViewInit() {
    let canvas = document.getElementById('plant-list-canvas') as HTMLCanvasElement;
    let parent = document.getElementById('canvasContainer') as HTMLDivElement;
    canvas.height = parent.offsetHeight * .95;
    canvas.width = parent.offsetWidth * .95;
    this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');

    canvas.onclick = (e) => {
      this.onMouseClick(e);
    }

    // TODO: use state to handle dragging to other canvas

  }

  ngOnInit() {
    this.draw();
    // this.getPlants();
    this.configureImageState();
  }

  private draw() {
    // this.plants.forEach(instance => {
    //   var img = new Image();
    //   img.src = instance.front_image_path;

    //   img.onload = () => {
    //     this.context.drawImage(img, instance.x, instance.y, 100, 100);
    //   }
    // })

    this.img = new Image();
    this.img.src = "https://www.fiftyflowers.com/site_files/FiftyFlowers/Image/Product/peony-sarah-bernhardt-bloom-500_b572106d.jpg";
    this.img.id = "1" // set id of img to the id of the corresponding plant
    this.img.width = 100;
    this.img.height = 100;
    this.img.onload = () => {
      this.context.drawImage(this.img, 10, 10, 100, 100);
    }
  }

  private configureImageState() {
    this.state.dragging     = false;
    this.state.canvas       = document.getElementById("plant-list-canvas");
    this.state.image        = this.img;
    this.state.offsetX      = 0;
    this.state.offsetY      = 0;
  }

  // getPlants() {
  //   this.instanceService.getPlants()
  //     .subscribe(res => {
  //       console.log(res);
  //       this.plants = res;
  //       this.draw();
  //     })
  // }

  private onMouseClick(event) {
    console.log(this.img.x)
    if (event.offsetX >= this.img.x && event.offsetX <= this.img.width + this.img.x && 
      event.offsetY >= this.img.y && event.offsetY <= this.img.y + this.img.height) {
      this.img.width = this.img.width + 10;
      this.img.height = this.img.height + 10; 
      this.context.drawImage(this.img, 10, 10, this.img.width, this.img.width); 
      console.log("Width: " + this.img.width);
    }
    
    var anything: any;
    return anything;
  }
}

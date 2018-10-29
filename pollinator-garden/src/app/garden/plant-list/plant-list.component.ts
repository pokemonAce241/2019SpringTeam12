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

  // plants: Plant[];

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

  }

  ngOnInit() {
    var img = new Image();
    img.src = "https://www.fiftyflowers.com/site_files/FiftyFlowers/Image/Product/peony-sarah-bernhardt-bloom-500_b572106d.jpg";

    img.onload = () => {
      this.context.drawImage(img, 10, 10, 100, 100);
    }
    // this.getPlants();
  }

  // private draw() {
  //     this.plants.forEach(instance => {
  //       var img = new Image();
  //       img.src = instance.front_image_path;

  //       img.onload = () => {
  //         this.context.drawImage(img, instance.x, instance.y, 100, 100);
  //       }
  //     })
  // }

  // getPlants() {
  //   this.instanceService.getPlants()
  //     .subscribe(res => {
  //       console.log(res);
  //       this.plants = res;
  //       this.draw();
  //     })
  // }

}

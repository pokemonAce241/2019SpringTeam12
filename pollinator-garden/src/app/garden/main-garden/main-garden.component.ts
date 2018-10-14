import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-main-garden',
  templateUrl: './main-garden.component.html',
  styleUrls: ['./main-garden.component.css']
})
export class MainGardenComponent implements OnInit, AfterViewInit {

  @ViewChild('canvasEl') canvasEl: ElementRef;
  
  /** Canvas 2d context */
  private context: CanvasRenderingContext2D;

  constructor() { }

  ngAfterViewInit() {
    this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');
    this.context.canvas.style.height = '100%';
    this.context.canvas.style.width = '100%';
  
    this.draw();
  }

  ngOnInit() {
  }

  private draw() {
    this.context.beginPath();
    this.context.moveTo(0,0);
    this.context.lineTo(300,150);
    this.context.stroke();
  }

}

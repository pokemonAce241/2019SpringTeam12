import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

//note the icon height may have to be calculated based on the screen size. Right now it is base on font-size with a defualt size of 24px 

@Component({
  selector: 'app-main-garden',
  templateUrl: './main-garden.component.html',
  styleUrls: ['./main-garden.component.css', './icon.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainGardenComponent implements OnInit, AfterViewInit {

  @ViewChild('canvasEl') canvasEl: ElementRef;
  
  /** Canvas 2d context */
  private context: CanvasRenderingContext2D;

  constructor(
    private router: Router
  ) { }

  ngAfterViewInit() { 
    let canvas = document.getElementById('canvas') as HTMLCanvasElement;
    let parent = document.getElementById('canvasContainer') as HTMLDivElement;
    canvas.height = parent.offsetHeight * .95;
    canvas.width = parent.offsetWidth * .95;
    this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');

    this.draw();
  }

  ngOnInit() {

  }

  private draw() {

    this.context.beginPath();
    this.context.moveTo(0,0);
    this.context.lineTo(.9 * this.context.canvas.width,.9 * this.context.canvas.height);
    this.context.stroke();
  }

  public goToShoppingList(): void {
    this.router.navigate(['/shopping-list']);
  }

}
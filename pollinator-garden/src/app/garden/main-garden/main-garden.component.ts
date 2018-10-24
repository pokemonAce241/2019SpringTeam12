import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlantInstance, InstanceService } from 'src/app/services/instance.service';

//note the icon height may have to be calculated based on the screen size. Right now it is base on font-size with a defualt size of 24px 

@Component({
  selector: 'app-main-garden',
  templateUrl: './main-garden.component.html',
  styleUrls: ['./main-garden.component.css', './icon.css'],
  providers: [InstanceService],
  encapsulation: ViewEncapsulation.None
})
export class MainGardenComponent implements OnInit, AfterViewInit {

  @ViewChild('canvasEl') canvasEl: ElementRef;
  
  /** Canvas 2d context */
  private context: CanvasRenderingContext2D;

  plant_instances: PlantInstance[];

  garden = {"id": 2};

  constructor(
    private router: Router,
    private instanceService: InstanceService
  ) { }

  ngAfterViewInit() { 
    let canvas = document.getElementById('canvas') as HTMLCanvasElement;
    let parent = document.getElementById('canvasContainer') as HTMLDivElement;
    canvas.height = parent.offsetHeight * .95;
    canvas.width = parent.offsetWidth * .95;
    this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');

  }

  ngOnInit() {
    this.getPlantInstances();
  }

  private draw() {
      this.plant_instances.forEach(instance => {
        var img = new Image();
        img.src = instance.front_image_path;

        img.onload = () => {
          this.context.drawImage(img, instance.x, instance.y, 100, 100);
        }
      })
  }

  public goToShoppingList(): void {
    this.router.navigate(['/shopping-list']);
  }

  getPlantInstances() {
    this.instanceService.getInstances(this.garden.id)
      .subscribe(res => {
        console.log(res);
        this.plant_instances = res;
        this.draw();

      })
  }

}
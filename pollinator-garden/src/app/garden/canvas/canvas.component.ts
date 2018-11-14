import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlantInstance, InstanceService } from 'src/app/services/instance.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
  providers: [InstanceService]
})
export class CanvasComponent implements OnInit {

  @ViewChild('canvasEl') canvasEl: ElementRef;
  
  /** Canvas 2d context */
  private context: CanvasRenderingContext2D;

  plant_instances: PlantInstance[];

  gardenId = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
    this.checkRouteId()
  }

  private draw() {
      this.clearCanvas();
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
    console.log("get plant instances called")
    this.instanceService.getInstances(this.gardenId)
      .subscribe(res => {
        console.log(res);
        this.plant_instances = res;
        this.draw();

      })
  }

  checkRouteId() {
    this.route.params.subscribe(params => {
      this.gardenId = +params['id'];
      if (!this.gardenId) {
        // open modal
        console.log("open modal");
      } else {
        this.getPlantInstances()
      }
    })
  }

  private clearCanvas() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

}

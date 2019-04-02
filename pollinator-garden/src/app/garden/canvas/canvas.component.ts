import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlantInstance, InstanceService } from 'src/app/services/instance.service';
import { CanvasTransitionService } from 'src/app/services/canvas-transition.service';
import { GardenService } from 'src/app/services/garden.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyGardensComponent } from '../my-gardens/my-gardens.component';
import { Plant, PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
  providers: [MyGardensComponent, InstanceService, NgbActiveModal]
})
export class CanvasComponent implements OnInit {

  // index to the html canvas object
  @ViewChild('canvasEl') canvasEl: ElementRef;
  // image dimensions
  private imgDims: any;
  // plant images
  private canvasPlants: any;
  // current index of the plant that is selected
  private index: any;
  // amount of plants that should be on the canvas
  private size: any;
  // Plant properties from the API (This is updated when new plants are placed and when plant images are moved in canvas)
  plant_instances: PlantInstance[];
  // list of plants from plant table in database
  plants: Plant[];
  // which garden to load
  garden = { "id": 2 };
  gardenId = null;
  /** Canvas 2d context */
  private context: CanvasRenderingContext2D;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private instanceService: InstanceService,
    private canvasService: CanvasTransitionService,
    private modalService: NgbModal,
    private gardenService: GardenService,
    private plantService: PlantService,
  ) {
    // Sets most fields to empty/0
    this.imgDims = [];
    this.canvasPlants = [];
    this.index = 0;
    this.size = 0;
    // Listens for when perspective change button is pressed then calls methods inside
    this.gardenService.viewChangeCalled$.subscribe(
        () => {
          console.log('View Change called!');
          this.clearCanvas();
          this.getPlantInstances();
        }
      );
  }

  // Gets the list of generic plants from the database when page is first initialized
  ngOnInit() {
    this.plantService.getPlants()
      .subscribe(res => {
        this.plants = res;
      });
    //var canvas = document.getElementById('canvas') as HTMLCanvasElement;

    //this.gardenService.setCanvasImage(canvas_image);
  }

  // Called after canvas has loaded
  // Defines user interaction with canvas through EventListeners
  ngAfterViewInit() {
    // Get the canvas
    let canvas = document.getElementById('canvas') as HTMLCanvasElement;
    //document.write("<img src='"+canvas.toDataURL("image/png")+"' alt='from canvas'/>");

    // Size the canvas to fill the div
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    // Have the height and width attributes match the style (1:1)
    canvas.height = canvas.offsetHeight;
    canvas.width = canvas.offsetWidth;

    // Gets the canvas coordinates (rectangle)
    let rect = canvas.getBoundingClientRect();

    //Instantiate a context based on the canvas
    this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');

    // If window is adjusted then adjust images on screen
    window.addEventListener("resize", (ev) => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      if (this.imgDims[this.index] !== undefined) {
        if (Number.isNaN(this.imgDims[this.index].xRel) || Number.isNaN(this.imgDims[this.index].yRel)) {
          this.imgDims[this.index].xRel = this.imgDims[this.index].x / canvas.width;
          this.imgDims[this.index].yRel = this.imgDims[this.index].y / canvas.height;
        }
        //update the new position based on the relative position
        this.imgDims[this.index].x = this.imgDims[this.index].xRel * canvas.width;
        this.imgDims[this.index].y = this.imgDims[this.index].yRel * canvas.height;
      }
      this.drawPlants(this.context);
    });

    // for deleting a plant from the canvas
    // canvas.addEventListener('dblclick', (ev) => {
    //   console.log("Double click");
    //   rect = canvas.getBoundingClientRect();
    //   var x = ev.clientX - rect.left;
    //   var y = ev.clientY - rect.top;
    //
    //   // similar to selecting a plant but no toggle flag
    //   for (var i = 0; i < this.size; i++) {
    //     if ((x > this.imgDims[i].x && x < this.imgDims[i].x + this.imgDims[i].width) &&
    //       (y > this.imgDims[i].y && y < this.imgDims[i].y + this.imgDims[i].height) &&
    //       !this.canvasService.isPlantCanvas()) {
    //       this.index = i;
    //       break;
    //     }
    //   }
    //
    //   this.deletePlants();
    //
    //   // update the garden
    //   this.drawPlants(this.context);
    //
    // });

    // First of three steps for drag/drop functionality
    // Called when mouse is initially pressed
    canvas.addEventListener('mousedown', (ev) => {
      // rect is the rectangle boundary of the canvas
      // client is mouse position on the client screen
      // x and y is the location within the canvas
      rect = canvas.getBoundingClientRect();
      var x = ev.clientX - rect.left;
      var y = ev.clientY - rect.top;

      // Sets current canvas to garden canvas
      this.canvasService.setGardenCanvas();

      // Selecting image at location (index becomes image index)
      // isDragged is true if a plant is currently being dragged
      // isPlantCanvas will be false when mouse is in garden canvas and true if mouse is in plant list canvas
      if (this.imgDims[this.index] !== undefined && !this.canvasService.isDragged()) {
        // Searches through the plant list for the plant that was selected
        for (var i = this.size-1; i >= 0; i--) {
          if ((x > this.imgDims[i].x && x < this.imgDims[i].x + this.imgDims[i].width) &&
            (y > this.imgDims[i].y && y < this.imgDims[i].y + this.imgDims[i].height) &&
            !this.canvasService.isPlantCanvas()) {
            console.log("Selected plant in canvas");
            this.index = i;
            this.canvasService.toggleDragged();
            break; //breaking after finding plant so it stops searching through plant list
          }
        }
      }
    });

    // Second of three steps for drag/drop functionality
    // Called when mouse is moved (whether normally or while dragging)
    document.addEventListener('mousemove', (ev) => {
      // rect is the rectangle boundary of the canvas
      // client is mouse position on the client screen
      // x and y is the location within the canvas
      rect = canvas.getBoundingClientRect();
      let x = ev.clientX - rect.left;
      let y = ev.clientY - rect.top;

      //async method below that gets the size and evaluates whether to instantiate a new plant object
      this.addNew().then(() => {
        // if the first time with the increased size then initialized
        if (this.canvasService.isInitialize()) {
          this.index = this.size - 1;          // from async method
          this.canvasPlants[this.index] = {};  // sets the new plant
          this.canvasPlants[this.index].img = new Image();
          this.imgDims[this.index] = {};       //sets the plant properties

          //Again, unsure what these are actually being used for since they say spread but are width and height
          this.imgDims[this.index].width = this.plants[this.canvasService.getId() - 1].min_spread * 40;
          this.imgDims[this.index].height = this.plants[this.canvasService.getId() - 1].min_spread * 40;
          this.imgDims[this.index].max_width = this.plants[this.canvasService.getId() - 1].max_spread * 40;
          this.imgDims[this.index].max_height = this.plants[this.canvasService.getId() - 1].max_spread * 40;

          //Adding variables for spread
          this.imgDims[this.index].min_spread = this.plants[this.canvasService.getId() - 1].min_spread * 40;
          this.imgDims[this.index].max_spread = this.plants[this.canvasService.getId() - 1].max_spread * 40;

          this.imgDims[this.index].xRel = NaN;
          this.imgDims[this.index].yRel = NaN;
          this.imgDims[this.index].placed = false;
          this.imgDims[this.index].plant_id = this.canvasService.getId();
          this.canvasPlants[this.index].name = this.plants[this.canvasService.getId() - 1].common_name;
          this.canvasService.toggleInitialize(); //marks it as intialized
        }

        // do not change x > 1 weird coincidence where last equals equivalent
        // sets current index to the current position
        if (this.imgDims[this.index] !== undefined && this.canvasService.isDragged() && x > 1) {
          this.imgDims[this.index].x = x - this.imgDims[this.index].width * .5;
          this.imgDims[this.index].y = y - this.imgDims[this.index].height * .5;
        }

        // sets the image of the plant if not set
        if (this.canvasPlants[this.index] !== undefined && this.canvasPlants[this.index].img.src === '' && !this.canvasService.isPlantCanvas()) {
          var image = new Image(); //width and height parameter optional
          image.src = this.canvasService.getImg();
          this.canvasPlants[this.index].img = image;
        }

        // do not change x < -50 (anomaly)
        // checks to see if the image crosses over the canvas boundary (From garden canvas --> plant list canvas)
        if (this.imgDims[this.index] !== undefined && x < -50 && !this.canvasService.isPlantCanvas()) {
          console.log("Mouse is over plant list");
          // Plant image should not be able to be dragged from garden canvas to plant list canvas
          this.canvasService.setDraggedToFalse();
          this.canvasService.setImg('');     //reset image
          this.canvasService.toggleCanvas(); //update active canvas
          if (this.canvasService.isDragged() && this.index === this.size - 1) {
            this.canvasPlants[this.index].img = new Image();
            this.canvasService.decrementSize();
          }
          // Redraw plants on canvas
          this.drawPlants(this.context);

        // Update and draw canvas with new coordinates of image
        // Makes it so plant image will look like it's being dragged while it is dragged
        } else if (this.canvasService.isDragged() && !this.canvasService.isPlantCanvas()) {
          console.log("updating placed plant information");
          this.drawPlants(this.context);
        }
      });

    });

    // Third of three steps for drag/drop functionality
    // Called after mouse click ends
    canvas.addEventListener('mouseup', (ev) => {
      // rect is the rectangle boundary of the canvas
      // client is mouse position on the client screen
      // x and y is the location within the canvas
      rect = canvas.getBoundingClientRect();
      var x = ev.clientX - rect.left;
      var y = ev.clientY - rect.top;

      // if within the garden canvas and toggled then update the current index image information
      if (this.imgDims !== undefined &&
        (x > 0 && x < canvas.width) &&
        (y > 0 && y < canvas.height) &&
        this.canvasService.isDragged() && !this.canvasService.isPlantCanvas()) {

        // Sets the x and y values to the center of the image
        this.imgDims[this.index].x = x - this.imgDims[this.index].width * .5;
        this.imgDims[this.index].y = y - this.imgDims[this.index].height * .5;
        this.imgDims[this.index].selected = true;

        // Clears the canvas
        this.context.clearRect(0, 0, canvas.width, canvas.height);

        // If image has not been placed on the canvas before / if it is a new image
        if (!this.imgDims[this.index].placed) {
          this.createInstance(this.imgDims[this.index]);
          this.imgDims[this.index].placed = true;
        // If the image has been placed before / if it is an old image that is being moved in the canvas
        } else {
          // The position of the plant instance is updated
          this.updateInstance(this.imgDims[this.index]);
        }

        // Redraws all plants instances on garden canvas
        this.drawPlants(this.context);
        // The plant is no longer being dragged so the field is reset
        this.canvasService.setDraggedToFalse();

      }

    });

    setTimeout(() => this.checkRouteId());

    //Event listener for when mouse is clicked
    // This is used for selecting a plant, so it is a little different than the other mouse event listeners
    document.addEventListener('click', (ev) => {
      // rect is the rectangle boundary of the canvas
      // client is mouse position on the client screen
      // x and y is the location within the canvas
      rect = canvas.getBoundingClientRect();
      var x = ev.clientX - rect.left;
      var y = ev.clientY - rect.top;

      if (this.imgDims !== undefined &&
        (x > 0 && x < canvas.width) &&
        (y > 0 && y < canvas.height) && !this.canvasService.isPlantCanvas()) {
          for (var i = 0; i < this.size; i++) {
            this.imgDims[i].selected = false;
          }
          for (var i = 0; i < this.size; i++) {
            if ((x > this.imgDims[i].x && x < this.imgDims[i].x + this.imgDims[i].width) &&
              (y > this.imgDims[i].y && y < this.imgDims[i].y + this.imgDims[i].height) &&
              !this.canvasService.isPlantCanvas()) {
              this.index = i;
              this.imgDims[this.index].selected = true;
            }
          }
          this.context.clearRect(0, 0, canvas.width, canvas.height);
          // Redraws all plants images on garden canvas
          this.drawPlants(this.context);
      }
    });

    // Used for deleting plants when selected
    // Registers delete and backspace button press
    document.addEventListener('keydown', (ev) => {
      if (ev.keyCode == 8) {
          for (var i = 0; i < this.imgDims.length; i++) {
            if (this.imgDims[i].selected) {
              this.index = i;
              this.deletePlants();
              // update the garden
              this.drawPlants(this.context);
            }
          }
          // Call event.preventDefault() to stop the character before the cursor
          // from being deleted. Remove this line if you don't want to do that.
          ev.preventDefault();
      }
      if (ev.keyCode == 46) {
          for (var i = 0; i < this.imgDims.length; i++) {
            if (this.imgDims[i].selected) {
              this.index = i;
              this.deletePlants();
              // update the garden
              this.drawPlants(this.context);
            }
          }
          // Call event.preventDefault() to stop the character after the cursor
          // from being deleted. Remove this line if you don't want to do that.
          ev.preventDefault();
      }
    });

  }

  public goToShoppingList(): void {
    this.router.navigate(['/shopping-list']);
  }

  // async method calls getSize helper method to get size from plantlist canvas (race condition)
  async addNew() {
    await this.getSize().then((size) => {
      this.size = size;
    });
  }

  // promise that gets size from the service and updates variable in the garden canvas (wait 10 microsec)
  private getSize(): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.canvasService.getSize());
      }, 10);
    });
  }

  getPlantInstances() {
    console.log("get plant instances called")
    this.plant_instances = [];
    this.instanceService.getInstances(this.gardenId)
      .subscribe(res => {
        console.log(res);
        this.plant_instances = res;
        this.canvasService.setSize(0);

        this.plant_instances.forEach(plant => {
          this.index = this.canvasService.getSize();
          this.canvasPlants[this.index] = {};  // sets the new plant
          this.canvasPlants[this.index].img = new Image();
          if (this.gardenService.isTopDownPerspective()) {
            this.canvasPlants[this.index].img.src = plant.front_image_path;
          } else {
            this.canvasPlants[this.index].img.src = plant.side_image_path;
          }
          this.canvasPlants[this.index].radius_img = new Image();
          this.canvasPlants[this.index].radius_img.src = "assets/images/Flower_Max_Radius.png";
          this.canvasPlants[this.index].name = plant.common_name;
          //this.canvasPlants[this.index].collision = plant.collision;
          this.imgDims[this.index] = {};       //sets the plant properties

          //What are these? They way height and wirdth but use min/max spread
          this.imgDims[this.index].width = plant.min_spread * 40;
          this.imgDims[this.index].height = plant.min_spread * 40;
          this.imgDims[this.index].max_width = plant.max_spread * 40;
          this.imgDims[this.index].max_height = plant.max_spread * 40;

          //Adding min/max spread values
          this.imgDims[this.index].min_spread = plant.min_spread * 40;
          this.imgDims[this.index].max_spread = plant.max_spread * 40;

          this.imgDims[this.index].xRel = NaN;
          this.imgDims[this.index].yRel = NaN;
          this.imgDims[this.index].x = plant.x;
          this.imgDims[this.index].y = plant.y;
          this.imgDims[this.index].ox = plant.x;
          this.imgDims[this.index].oy = plant.y;
          this.imgDims[this.index].plant_id = plant.plant_id;
          this.imgDims[this.index].id = plant.id;
          this.imgDims[this.index].placed = true;
          this.imgDims[this.index].collision = plant.collision;
          this.imgDims[this.index].selected = false;
          this.canvasService.incrementSize();

          // this.context.drawImage(this.canvasPlants[this.index].img, this.imgDims[this.index].x, this.imgDims[this.index].y, 100, 100);
        })
        this.checkForCollisions();
        this.canvasPlants.forEach((plant, i) => {
          plant.img.onload = () => {
            console.log("image loaded");
            if(this.gardenService.isTopDownPerspective()) {
              this.context.globalAlpha = .75;
              this.context.drawImage(this.canvasPlants[i].img, this.imgDims[i].x, this.imgDims[i].y, this.imgDims[i].width, this.imgDims[i].height);
            } else {
              var canvCenter = 1440 / 2;
              this.context.globalAlpha = 1;
              var yLoc = (this.imgDims[i].y/579)*(382) + 217 - this.imgDims[i].max_height;
              var xLoc = this.imgDims[i].x;
              var ySize = this.imgDims[i].max_height * 1.15 * ((yLoc/579) + 1);
              var xSize = this.imgDims[i].max_width * 1.15 * ((yLoc/579) + 1);
              this.context.drawImage(this.canvasPlants[i].img, xLoc, yLoc, xSize, ySize);
            }
            if (this.gardenService.isTopDownPerspective()) {
              this.context.globalAlpha = 1;
              if (this.imgDims[i].collision) {
                // Drawing red circle
                this.context.beginPath();
                this.context.setLineDash([0,0]);
                this.context.strokeStyle = "#FF0000";
                this.context.lineWidth = 5;
                this.context.arc(this.imgDims[i].x + (this.imgDims[i].min_spread/2), this.imgDims[i].y + (this.imgDims[i].min_spread/2), this.imgDims[i].min_spread/2, 0, 2 * Math.PI);
                this.context.stroke();
                this.context.fillRect(0,0, 160, 30);
                this.context.fillStyle ="#FFFFFF";
                this.context.fillText("Two or more plants are colliding", 5, 16);
              }
              this.context.fillStyle ="#000000";
              this.context.beginPath();
              this.context.setLineDash([10,15]);
              this.context.arc(this.imgDims[i].x + (this.imgDims[i].min_spread/2), this.imgDims[i].y + (this.imgDims[i].min_spread/2), this.imgDims[i].max_spread/2, 0, 2 * Math.PI);
              this.context.strokeStyle = "#000000";
              this.context.lineWidth = 1;
              this.context.stroke();
              this.context.globalAlpha = 1;
              var textWidth = this.context.measureText(this.canvasPlants[i].name).width;
              this.context.fillText(this.canvasPlants[i].name, (this.imgDims[i].x + ((this.imgDims[i].width - textWidth) / 2)) , this.imgDims[i].y + this.imgDims[i].height / 2);
            }
            // this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
            // for (var i = 0; i < this.size; i++) {
            //   this.context.drawImage(this.canvasPlants[i].img, this.imgDims[i].x, this.imgDims[i].y, 100, 100);
            // }
          }
        })

        // this.draw();
      });

    console.log(this.imgDims);
  }

  draw() {
    this.clearCanvas();
    this.plant_instances.forEach(instance => {
      var img = new Image();
      img.src = instance.front_image_path;
      var radius_img = new Image();
      radius_img.src = "assets/images/Flower_Max_Radius.png";
      img.onload = () => {
        this.context.drawImage(img, instance.x, instance.y, instance.min_spread, instance.min_spread);
        if (this.gardenService.isTopDownPerspective()) {
          this.context.beginPath();
          this.context.setLineDash([10,15]);
          this.context.strokeStyle = "#000000";
          this.context.lineWidth = 1;
          this.context.arc(instance.x + (instance.min_spread/2), instance.y + (instance.min_spread/2), instance.max_spread/2, 0, 2 * Math.PI);
          this.context.stroke();
        }
        //this.context.fillText(this.canvasPlants[i].name, in.x + this.imgDims[i].width / 3, this.imgDims[i].y + this.imgDims[i].height / 2);
      }
    });
  }

  checkRouteId() {
    this.route.params.subscribe(params => {
      this.gardenId = +params['id'];
      if (!this.gardenId) {
        // open modal
        console.log("open modal");
        var modalRef = this.modalService.open(MyGardensComponent, { windowClass: 'dialog-modal content-modal' });
        modalRef.componentInstance.name = 'World';
      } else {
        this.getPlantInstances()
      }
    })
  }

  private clearCanvas() {
    this.context.clearRect(0,0, this.context.canvas.width, this.context.canvas.height);
  }

  drawPlants(context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    if(this.gardenService.isTopDownPerspective()) {
      this.checkForCollisions();
      for(var i = 0; i < this.size; i++) {
        context.globalAlpha = .75;
        context.drawImage(this.canvasPlants[i].img, this.imgDims[i].x, this.imgDims[i].y, this.imgDims[i].width, this.imgDims[i].height);
        context.globalAlpha = 1;
        if (this.imgDims[i].collision) {
          // Drawing red circle
          context.beginPath();
          context.setLineDash([0,0]);
          context.strokeStyle = "#FF0000";
          context.lineWidth = 5;
          context.arc(this.imgDims[i].x + (this.imgDims[i].min_spread/2), this.imgDims[i].y + (this.imgDims[i].min_spread/2), this.imgDims[i].min_spread/2, 0, 2 * Math.PI);
          context.stroke();
          context.fillRect(0,0, 160, 30);
          context.fillStyle ="#FFFFFF";
          context.fillText("Two or more plants are colliding", 5, 16);
        }
        if (this.imgDims[i].selected) {
          // Drawing blue circle
          context.beginPath();
          context.setLineDash([0,0]);
          context.strokeStyle = "#0000FF";
          context.lineWidth = 5;
          context.arc(this.imgDims[i].x + (this.imgDims[i].min_spread/2), this.imgDims[i].y + (this.imgDims[i].min_spread/2), this.imgDims[i].min_spread/2, 0, 2 * Math.PI);
          context.stroke();
        }
        // Drawing dashed circle
        context.fillStyle ="#000000";
        context.beginPath();
        context.setLineDash([10,15]);
        context.strokeStyle = "#000000";
        context.lineWidth = 1;
        context.arc(this.imgDims[i].x + (this.imgDims[i].min_spread/2), this.imgDims[i].y + (this.imgDims[i].min_spread/2), this.imgDims[i].max_spread/2, 0, 2 * Math.PI);
        context.stroke();

        var textWidth = context.measureText(this.canvasPlants[i].name).width;
        //if (textWidth) {
        context.fillText(this.canvasPlants[i].name, (this.imgDims[i].x + ((this.imgDims[i].width - textWidth) / 2)) , this.imgDims[i].y + this.imgDims[i].height / 2);
      }
    } else {
      for(var i = 0; i < this.size; i++) {
        var canvCenter = 1440 / 2;
        context.globalAlpha = 1;
        var yLoc = (this.imgDims[i].y/579)*(382) + 217 - this.imgDims[i].max_height;
        var xLoc = this.imgDims[i].x;
        // Try to move the plants close to the center the farther back they are in the garden
        if (xLoc < canvCenter) {
          // Plant is to the left of the center

        } else if (xLoc > canvCenter) {
          // Plant is to the right of the center

        } else {
          // Plant is in the center

        }
        var ySize = this.imgDims[i].max_height * 1.15 * ((yLoc/579) + 1);
        var xSize = this.imgDims[i].max_width * 1.15 * ((yLoc/579) + 1);
        context.drawImage(this.canvasPlants[i].img, xLoc, yLoc, xSize, ySize);
      }
    }

  }

  createInstance(imgDims) {
    var newInstance = new PlantInstance();
    newInstance.plant_id = imgDims.plant_id;
    newInstance.x = imgDims.x;
    newInstance.y = imgDims.y;
    newInstance.garden_id = this.gardenId;
    newInstance.collision = false;

    this.instanceService.createInstance(newInstance)
      .subscribe(res => {
        console.log(res);
        imgDims.id = res.id;
        //this.index = this.canvasService.getSize();
        //this.plant_instances[this.index] = res;
      })
    this.checkForCollisions();
  }

  deletePlants() {
    //This is where we locally reset the plant and can do the same from the api to the database
    this.deleteInstance(this.imgDims[this.index].id);
    this.imgDims[this.index] = {};
    this.canvasPlants[this.index] = {};
    this.canvasPlants[this.index].img = new Image();
  }

  checkForCollisions() {
    for (var i = 0; i < this.imgDims.length; i++) {
      this.imgDims[i].collision = false;
    }
    for (var i = 0; i < this.imgDims.length; i++) {
      var currentPlant1 = this.imgDims[i];
      var xStart1 = currentPlant1.x;
      var yStart1 = currentPlant1.y;
      var radius1 = currentPlant1.min_spread / 2;
      for (var j = 0; j < this.imgDims.length; j++) {
        var currentPlant2 = this.imgDims[j];
        var xStart2 = currentPlant2.x;
        var yStart2 = currentPlant2.y;
        var radius2 = currentPlant2.min_spread / 2;
        if (j !== i) {
          var d = Math.hypot(Math.abs((xStart2+radius2)-(xStart1+radius1)), Math.abs((yStart2+radius2)-(yStart1+radius1)));
          if (d < (radius1 + radius2)) {
            // They are overlapping
            this.imgDims[i].collision = true;
            this.imgDims[j].collision = true;
          }
        }
      }
    }
  }

  updateInstance(updateImgDims) {
    var updateInstance = new PlantInstance();
    updateInstance.id = updateImgDims.id;
    updateInstance.x = updateImgDims.x;
    updateInstance.y = updateImgDims.y;
    updateInstance.collision = false;

    this.instanceService.updateInstance(updateInstance)
      .subscribe(res => {
        console.log(res);
      });

    this.checkForCollisions();

  }

  deleteInstance(index) {
    console.log(index);
    this.instanceService.deleteInstance(index)
      .subscribe(res => {
        console.log(res);
      })
    this.checkForCollisions();
  }
}

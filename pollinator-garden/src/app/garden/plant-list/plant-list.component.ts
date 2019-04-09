import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstanceService, PlantInstance } from 'src/app/services/instance.service';
import { CanvasTransitionService } from 'src/app/services/canvas-transition.service';
import { GardenService } from 'src/app/services/garden.service';
import { Plant, PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css']
})

export class PlantListComponent implements OnInit {

  // index to the html canvas object
  @ViewChild('canvasEl') canvasEl: ElementRef;

  /** Canvas 2d context */
  private context: CanvasRenderingContext2D;
  // image dimensions
  private imgDims: any;
  // plant images
  private img: HTMLImageElement;
  // reset the canvas to original
  private reset: boolean;
  private index: any;
  private size: any;
  garden = { "id": 2 };
  // Plant properties from the API
  plant_instances: PlantInstance[];

  plants: Plant[];
  filteredPlants: Plant[];

  //Updated the season filters to include early/late seasons
  seasonFilters = {
    "esummer": false,
    "lsummer": false,
    "espring": false,
    "lspring": false,
    "efall": false,
    "lfall": false,
    "winter": false
  }

  seasonActive = false;

  nativeFilters = {
    "native": false,
    "nonnative": false
  }

  plantNativeness: string;

  nativeActive = false;

  regionFilters = {
    "mountain": false,
    "piedmont": false,
    "coast": false
  }

  plantRegion: string;

  regionActive = false;

  colorFilters = {
    "red": false,
    "blue": false,
    "purple": false,
    "pink": false,
    "yellow": false,
    "white": false,
    "orange": false,
    "green": false,
    "other": false
  }

  colorActive = false;

  typeFilters = {
    "vine": false,
    "shrub": false,
    "perennial": false,
    "annual": false
  }

  plantType: string;

  typeActive = false;

  soilFilters = {
    "wet": false,
    "moist": false,
    "dry": false,
  }

  soilStatus: string;

  soilActive = false;

  minHeight: number;
  maxHeight: number;

  heightActive = false;

  searchText: string;

  constructor(private canvasService: CanvasTransitionService,
    private instanceService: InstanceService,
    private plantService: PlantService,
    private gardenService: GardenService,
  ) {
    this.imgDims = [];
    this.img = new Image();
    this.size = 0;
  }

  ngAfterViewInit() {

    let canvas = document.getElementById('plant-list-canvas') as HTMLCanvasElement;
    // size the canvas to fill the div
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    // have the height and width attributes match the style (1:1)
    canvas.height = canvas.offsetHeight + 500;
    canvas.width = canvas.offsetWidth;
    // gets the canvas coordinates (rectangle)
    let rect = canvas.getBoundingClientRect();
    //instantiate a context based on the canvas
    this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');

    window.addEventListener("resize", (ev) => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      this.context.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < this.size; i++) {
        if (this.imgDims[i].xRel === undefined || this.imgDims[i].yRel === undefined) {
          this.imgDims[i].xRel = this.imgDims[i].x / canvas.width;
          this.imgDims[i].yRel = this.imgDims[i].y / canvas.height;
        }
        this.imgDims[i].x = this.imgDims[i].xRel * canvas.width;
        this.imgDims[i].y = this.imgDims[i].yRel * canvas.height;
        this.context.drawImage(this.imgDims[i].img, this.imgDims[i].x, this.imgDims[i].y, this.imgDims[i].width, this.imgDims[i].height);
        //console.log("oxRel " + this.imgDims[i].oxRel);
        this.context.fillText(this.imgDims[i].name, canvas.width * this.imgDims[i].oxRel, this.imgDims[i].oy + this.imgDims[i].height + 10);
        this.imgDims[i].oxRel = (canvas.width * this.imgDims[i].oxRel) / canvas.width;
      }
    });

    // First of three steps for drag/drop functionality
    // Called when mouse is initially pressed
    canvas.addEventListener('mousedown', (ev) => {

        // rect is the rectangle boundary of the canvas
        // client is mouse position on the client screen
        // x and y is the location within the canvas
        rect = canvas.getBoundingClientRect();
        var x = ev.clientX - rect.left;
        var y = ev.clientY - rect.top;

        // Checks if mouse click is within dimensions of any of the images
        for (var i = 0; i < this.size; i++) {
          // if not selected and clicked then toggle and break
          if ((x > this.imgDims[i].x && x < this.imgDims[i].x + this.imgDims[i].width) &&
            (y > this.imgDims[i].y && y < this.imgDims[i].y + this.imgDims[i].height) &&
            !this.canvasService.isDragged() && this.canvasService.isPlantCanvas()) {
            this.canvasService.toggleDragged();
            this.index = i;
            return;
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
      var x = ev.clientX - rect.left;
      var y = ev.clientY - rect.top;

      // Checks if mouse is currently in the plant list canvas
      if (this.canvasService.isPlantCanvas()) {
          // image selected and crossing boundary pass information
        if (this.canvasService.isDragged() && x > canvas.width && y > 0 && y < canvas.height) {
          this.canvasService.incrementSize();
          // Resets plant toggle to false (so it is no longer selected in the plant window)
          this.canvasService.toggleCanvas();
          // Clears the canvas
          this.context.clearRect(0, 0, canvas.width, canvas.height);
          // Sets the initialize toggle for the other canvas (lets the other canvas know a new plant will be placed)
          this.canvasService.toggleInitialize();
          // Sets the image path to top-down image, if in top-down perspective
          if (this.gardenService.isTopDownPerspective()) {
            this.imgDims[this.index].img.src = this.plants[this.imgDims[this.index].id - 1].front_image_path;
          }
          this.canvasService.setImg(this.imgDims[this.index].img.src);
          this.imgDims[this.index].img.src = this.plants[this.imgDims[this.index].id - 1].side_image_path;
          console.log("Image Set");
          // Stores the id of the image
          this.canvasService.setId(this.imgDims[this.index].id);

          this.imgDims[this.index].x = this.imgDims[this.index].ox;
          this.imgDims[this.index].y = this.imgDims[this.index].oy;
          this.context.clearRect(0, 0, canvas.width, canvas.height);
          // This makes sure all plants in plant list stay visible when mouse switches canvases
          for (var i = 0; i < this.size; i++) {
            this.context.drawImage(this.imgDims[i].img, this.imgDims[i].x, this.imgDims[i].y, this.imgDims[i].width, this.imgDims[i].height);
            this.context.fillText(this.imgDims[i].name, this.imgDims[i].ox, this.imgDims[i].oy + this.imgDims[i].height + 10);
          }

          this.context.fillText(this.imgDims[this.index].name, this.imgDims[this.index].ox, this.imgDims[this.index].oy + this.imgDims[this.index].height + 10);

        // If no image then still signal change of canvas
        } else if (this.canvasService.getImg() === '' && x > canvas.width && y > 0 && y < canvas.height) {
          this.canvasService.toggleCanvas();

        // If still in plant canvas and plant is being dragged
        } else if (this.canvasService.isDragged()) {
          if (this.canvasService.getImg() === '') {
              // Takes the image source from the assets file and stores it in the canvas img field
            this.canvasService.setImg(this.imgDims[this.index].img.src);
            // Stores the id of the image
            this.canvasService.setId(this.imgDims[this.index].id);
          }
          this.imgDims[this.index].x = x - this.imgDims[this.index].width * .5;
          this.imgDims[this.index].y = y - this.imgDims[this.index].height * .5;
          this.context.clearRect(0, 0, canvas.width, canvas.height);
          // this will replace the images in the plant list when you move the mouse back and forth between the plant canvas
          // and the garden canvas
          for (var i = 0; i < this.size; i++) {
            this.context.drawImage(this.imgDims[i].img, this.imgDims[i].x, this.imgDims[i].y, this.imgDims[i].width, this.imgDims[i].height);
            this.context.fillText(this.imgDims[i].name, this.imgDims[i].ox, this.imgDims[i].oy + this.imgDims[i].height + 10);
          }
        }
      } else {
        if(this.imgDims[this.index] !== undefined && this.canvasService.isDragged()) {
          this.context.clearRect(0, 0, canvas.width, canvas.height);
          // This makes sure all plants in plant list stay visible when mouse switches canvases
          for (var i = 0; i < this.size; i++) {
            this.context.drawImage(this.imgDims[i].img, this.imgDims[i].x, this.imgDims[i].y, this.imgDims[i].width, this.imgDims[i].height);
            this.context.fillText(this.imgDims[i].name, this.imgDims[i].ox, this.imgDims[i].oy + this.imgDims[i].height + 10);
          }

          this.context.fillText(this.imgDims[this.index].name, this.imgDims[this.index].ox, this.imgDims[this.index].oy + this.imgDims[this.index].height + 10);
        }
      }


    });

    // Third of three steps for drag/drop functionality
    // Called after mouse click ends
    document.addEventListener('mouseup', (ev) => {

      console.log("Watermelon");

      // Drag boolean will always get set to false on mouseup event
      this.canvasService.setDraggedToFalse();

      // Resets image dimensions to original values
      if (this.index !== undefined) {
        this.imgDims[this.index].x = this.imgDims[this.index].ox;
        this.imgDims[this.index].y = this.imgDims[this.index].oy;
      }

      // Clears the canvas
      this.context.clearRect(0, 0, canvas.width, canvas.height);

      // Redraws the pictures on the plant list canvas
      for(var i = 0; i < this.size; i++) {
        this.context.drawImage(this.imgDims[i].img, this.imgDims[i].x, this.imgDims[i].y, this.imgDims[i].width, this.imgDims[i].height);
        this.context.fillText(this.imgDims[i].name, this.imgDims[i].ox, this.imgDims[i].oy + this.imgDims[i].height + 10);
      }

    });

  }

  ngOnInit() {
    this.plantService.getPlants()
      .subscribe(res => {
        this.plants = res;
        this.plants.forEach(plant => {
          plant.img = new Image();
          plant.img.src = plant.side_image_path;
        });
        this.plants[this.plants.length - 1].img.onload = () => {this.filterPlants()}
      });

  }

  loadPlants() {
    // get canvas for width
    let canvas = document.getElementById('plant-list-canvas') as HTMLCanvasElement;
    // gets the line # for plants
    var line = 0;
    // margin percentage
    let marginP = .1;
    // margin that surround the image on both sides (based on margin percentage)
    var margin = canvas.width * marginP;
    // size of the image  (left over dimensions)
    var size = canvas.width * ((1 - 3 * marginP) / 2);
    // depending on the screen size this can be very big image (max size 100)
    if (size > 100) {
      size = 100
      margin = (canvas.width - 200) / 3;
    }

    this.context.clearRect(0, 0, canvas.width, canvas.height);
    this.imgDims = [];
    this.size = 0;


    this.filteredPlants.forEach(plant => {
      // if the image is mod 0 then begin pic on line
      if (this.size % 2 === 0) {
        this.imgDims[this.size] = {};
        // x is just the margin off (original x for reset and a reference of origin)
        this.imgDims[this.size].ox = margin;
        // y depends on the line size
        this.imgDims[this.size].oy = 10 + line * (size + 20);
        this.context.drawImage(plant.img, this.imgDims[this.size].ox, this.imgDims[this.size].oy, size, size);
        this.imgDims[this.size].x = this.imgDims[this.size].ox;
        this.imgDims[this.size].y = this.imgDims[this.size].oy;
        this.imgDims[this.size].width = size;
        this.imgDims[this.size].height = size;
        let canvas = document.getElementById('plant-list-canvas') as HTMLCanvasElement;
        this.imgDims[this.size].oxRel = this.imgDims[this.size].ox / canvas.width;
        this.imgDims[this.size].xRel = this.imgDims[this.size].x / canvas.width;
        this.imgDims[this.size].yRel = this.imgDims[this.size].y / canvas.height;
        this.imgDims[this.size].img = plant.img;
        this.imgDims[this.size].name = plant.common_name;
        this.imgDims[this.size].id = plant.id;
        this.context.fillText(this.imgDims[this.size].name, this.imgDims[this.size].x, this.imgDims[this.size].y + this.imgDims[this.size].height + 10);
      } else {
        this.imgDims[this.size] = {};
        // margin image margin = x location
        this.imgDims[this.size].ox = 2 * margin + size;
        this.imgDims[this.size].oy = 10 + line * (size + 20);
        this.context.drawImage(plant.img, this.imgDims[this.size].ox, this.imgDims[this.size].oy, size, size);
        this.imgDims[this.size].x = this.imgDims[this.size].ox;
        this.imgDims[this.size].y = this.imgDims[this.size].oy;
        this.imgDims[this.size].width = size;
        this.imgDims[this.size].height = size;
        let canvas = document.getElementById('plant-list-canvas') as HTMLCanvasElement;
        this.imgDims[this.size].oxRel = this.imgDims[this.size].ox / canvas.width;
        this.imgDims[this.size].xRel = this.imgDims[this.size].x / canvas.width;
        this.imgDims[this.size].yRel = this.imgDims[this.size].y / canvas.height;
        this.imgDims[this.size].img = plant.img;
        this.imgDims[this.size].name = plant.common_name;
        this.imgDims[this.size].id = plant.id;
        this.context.fillText(this.imgDims[this.size].name, this.imgDims[this.size].x, this.imgDims[this.size].y + this.imgDims[this.size].height + 10);

      }
      if (this.size % 2 !== 0) {
        line++;
      }
      this.size++;
    });
  }

  // getPlantInstances() {
  //   this.instanceService.getInstances(this.garden.id)
  //     .subscribe(res => {
  //       console.log(res);
  //       this.plant_instances = res;
  //     })
  // }

  // async method calls getReset helper method to decide to reset (race condition)
  async updateReset() {
    await this.getReset().then((reset) => {
      this.reset = reset;
    });
  }

  public getPlants() : Plant[] {
    this.plantService.getPlants()
      .subscribe(res => {
        this.plants = res;
        console.log(this.plants);
      });
    return this.plants;
  }

  // Used for testing purposes
  public getLocalPlantList() : Plant[] {
    return this.plants;
  }

  public filterPlants() {
    this.filteredPlants = this.plants;

    // SEASONS
    this.filteredPlants = this.filteredPlants.filter(plant => {
      var match = false;

      //updated filtering to include early and late seasons
      if (this.seasonFilters.espring && plant.espring) {
        match = true;
      }
      if (this.seasonFilters.lspring && plant.lspring) {
        match = true;
      }
      if (this.seasonFilters.esummer && plant.esummer) {
        match = true;
      }
      if (this.seasonFilters.lsummer && plant.lsummer) {
        match = true;
      }
      if (this.seasonFilters.efall && plant.efall) {
        match = true;
      }
      if (this.seasonFilters.lfall && plant.lfall) {
        match = true;
      }
      if (this.seasonFilters.winter && plant.winter) {
        match = true;
      }

      if (!this.seasonFilters.espring &&
          !this.seasonFilters.esummer &&
          !this.seasonFilters.efall &&
          !this.seasonFilters.lspring &&
          !this.seasonFilters.lsummer &&
          !this.seasonFilters.lfall &&
          !this.seasonFilters.winter) {
        this.seasonActive = false;
        return true;
      }

      this.seasonActive = true;
      return match;
    });

    // REGIONS
    this.filteredPlants = this.filteredPlants.filter(plant => {
      var match = false;

      if (this.plantRegion === "mountain" && plant.mountain) {
        match = true;
      }
      if (this.plantRegion === "piedmont" && plant.piedmont) {
        match = true;
      }
      if (this.plantRegion === "coast" && plant.coast) {
        match = true;
      }

      if (this.plantRegion != "mountain" &&
          this.plantRegion != "piedmont" &&
          this.plantRegion != "coast") {
        this.regionActive = false;
        return true;
      }

      this.regionActive = true;
      return match;
    });

    // COLORS
    this.filteredPlants = this.filteredPlants.filter(plant => {
      var match = false;

      if (this.colorFilters.red && plant.red) {
        match = true;
      }
      if (this.colorFilters.blue && plant.blue) {
        match = true;
      }
      if (this.colorFilters.purple && plant.purple) {
        match = true;
      }
      if (this.colorFilters.pink && plant.pink) {
        match = true;
      }
      if (this.colorFilters.yellow && plant.yellow) {
        match = true;
      }
      if (this.colorFilters.white && plant.white) {
        match = true;
      }
      if (this.colorFilters.orange && plant.orange) {
        match = true;
      }
      if (this.colorFilters.green && plant.green) {
        match = true;
      }
      if (this.colorFilters.other && plant.other) {
        match = true;
      }

      if (!this.colorFilters.red &&
          !this.colorFilters.blue &&
          !this.colorFilters.purple &&
          !this.colorFilters.pink &&
          !this.colorFilters.yellow &&
          !this.colorFilters.white &&
          !this.colorFilters.orange &&
          !this.colorFilters.green &&
          !this.colorFilters.other) {
        this.colorActive = false;
        return true;
      }

      this.colorActive = true;
      return match;
    });

    // NATIVE
    this.filteredPlants = this.filteredPlants.filter(plant => {
      var match = false;

      if (this.plantNativeness === "none") {
        match = true;
        this.nativeActive = false;
      }
      if (this.plantNativeness === "native" && plant.native) {
        match = true;
      }
      if (this.plantNativeness === "nonnative" && !plant.native) {
        match = true;
      }

      if (this.plantNativeness != "native" &&
          this.plantNativeness != "nonnative") {
        this.nativeActive = false;
        return true;
      }

      this.nativeActive = true;
      return match;
    });

    // TYPES
    this.filteredPlants = this.filteredPlants.filter(plant => {
      var match = false;

      if (this.plantType === "vine" && plant.plant_type === "vine") {
        match = true;
      }
      if (this.plantType === "shrub" && plant.plant_type === "shrub") {
        match = true;
      }
      if (this.plantType === "annual" && plant.plant_type === "annual") {
        match = true;
      }
      if (this.plantType === "perennial" && plant.plant_type === "perennial") {
        match = true;
      }

      if (this.plantType != "vine" &&
          this.plantType != "shrub" &&
          this.plantType != "annual" &&
          this.plantType != "perennial") {
        this.typeActive = false;
        return true;
      }

      this.typeActive = true;
      return match;
    });

    // SOILS
    this.filteredPlants = this.filteredPlants.filter(plant => {
      var match = false;

      if (this.soilStatus === "wet" && plant.wet) {
        match = true;
      }
      if (this.soilStatus === "moist" && plant.moist) {
        match = true;
      }
      if (this.soilStatus === "dry" && plant.dry) {
        match = true;
      }

      if (this.soilStatus != "wet" &&
          this.soilStatus != "moist" &&
          this.soilStatus != "dry") {
            this.soilActive = false;
            return true;
      }
      //console.log(this.soilStatus);
      this.soilActive = true;
      return match;
    });

    // HEIGHT
    this.filteredPlants = this.filteredPlants.filter(plant => {
      var match = false;
      // added checking if what was entered by user was blank, since this should function the same as if undefined
      if (this.minHeight === undefined || this.minHeight.toString() === "") {
        this.minHeight = 0;
      }
      // added checking if what was entered by user was blank, since this should function the same as if undefined
      if (this.maxHeight === undefined || this.maxHeight.toString() === "") {
        this.maxHeight = 20;
      }

      if (this.minHeight == 0 && this.maxHeight == 20) {
        this.heightActive = false;
      } else {
        this.heightActive = true;
      }
      /*Updated if statement to check if the ranges overlap at all. Originally this was setup to check
      if the plant min height was greater than the entered min height and the plant max height was less
      than the entered max height.*/
      if (plant.min_height >= this.minHeight && plant.max_height <= this.maxHeight
        || plant.min_height <= this.minHeight && plant.max_height >= this.minHeight && plant.max_height <= this.maxHeight
        || plant.max_height <= this.maxHeight && plant.min_height >= this.minHeight && plant.min_height <= this.maxHeight
        || plant.min_height <= this.minHeight && plant.max_height >= this.maxHeight) {
        match = true;
      }

      return match;
    });

    // SEARCH
    if (this.searchText != "" && this.searchText != undefined) {
      this.filteredPlants = this.filteredPlants.filter(plant => {
        return plant.common_name.toLowerCase().includes(this.searchText.toLowerCase());
      });
    }

    this.filteredPlants.sort((a, b) => {
      if (a.common_name < b.common_name) {
        return -1;
      }
      if (a.common_name > b.common_name) {
        return 1;
      }
      return 0;
    })

    this.loadPlants();
  }

  clearFilter() {
    for (var property in this.seasonFilters) {
      this.seasonFilters[property] = false;
    }

    for (var property in this.regionFilters) {
      this.plantRegion = "";
    }

    for (var property in this.colorFilters) {
      this.colorFilters[property] = false;
    }

    for (var property in this.typeFilters) {
      this.plantType= "";
    }

    for (var property in this.soilFilters) {
      this.soilStatus = "";
    }

    for (var property in this.nativeFilters) {
      this.plantNativeness = "";
    }

    this.minHeight = 0;
    this.maxHeight = 20;

    this.filterPlants();
  }

  // promise that gets size from the service and updates variable in the plantlist canvas (wait 50 microsec)
  private getReset(): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.canvasService.isReset());
      }, 50);
    });
  }
}

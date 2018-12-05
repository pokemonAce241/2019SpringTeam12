import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstanceService, PlantInstance } from 'src/app/services/instance.service';
import { CanvasTransitionService } from 'src/app/services/canvas-transition.service';
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

  seasonFilters = {
    "summer": false,
    "spring": false,
    "fall": false,
    "winter": false
  }

  seasonActive = false;

  regionFilters = {
    "mountain": false,
    "piedmont": false,
    "coast": false
  }

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

  typeActive = false;

  soilFilters = {
    "wet": false,
    "moist": false,
    "dry": false
  }

  soilActive = false;

  minHeight: number;
  maxHeight: number;

  heightActive = false;

  searchText: string;

  constructor(private canvasService: CanvasTransitionService,
    private instanceService: InstanceService,
    private plantService: PlantService
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
        if (this.imgDims[i].xRel !== undefined || this.imgDims[i].yRel !== undefined) {
          this.imgDims[i].xRel = this.imgDims[i].x / canvas.width;
          this.imgDims[i].yRel = this.imgDims[i].y / canvas.height;
        }
        this.imgDims[i].x = this.imgDims[i].xRel * canvas.width;
        this.imgDims[i].y = this.imgDims[i].yRel * canvas.height;
        this.context.drawImage(this.imgDims[i].img, this.imgDims[i].x, this.imgDims[i].y, this.imgDims[i].width, this.imgDims[i].height);
      }
    });

    document.addEventListener('click', (ev) => {

      var test = ev.target as HTMLElement;
      console.log(test.tagName);
      if (test.tagName !== "CANVAS") {
        return;
      }

      // async method below that gets whether to reset the canvas
      this.updateReset().then(() => {
        // if reset then restore image back to original dimensions
        if (this.reset) {
          this.canvasService.toggleReset();
          if(this.index !== undefined && this.index !== -1) {
            // console.log(this.index);
            this.imgDims[this.index].x = this.imgDims[this.index].ox;
            this.imgDims[this.index].y = this.imgDims[this.index].oy;
            this.index = -1;
          }
          for(var i = 0; i < this.size; i++) {
            this.context.drawImage(this.imgDims[i].img, this.imgDims[i].x, this.imgDims[i].y, this.imgDims[i].width, this.imgDims[i].height);
          }
          return;
        }

        rect = canvas.getBoundingClientRect();
        var x = ev.clientX - rect.left;
        var y = ev.clientY - rect.top;

        for (var i = 0; i < this.size; i++) {
          // if not selected and clicked then toggle and break
          if ((x > this.imgDims[i].x && x < this.imgDims[i].x + this.imgDims[i].width) &&
            (y > this.imgDims[i].y && y < this.imgDims[i].y + this.imgDims[i].height) &&
            !this.canvasService.isToggled() && this.canvasService.isPlantCanvas()) {
            this.canvasService.toggleSelected();
            this.index = i;
            return;
          }
        }

        if (this.canvasService.isToggled() && this.canvasService.isPlantCanvas()) {
          this.canvasService.toggleSelected();
          this.imgDims[this.index].x = this.imgDims[this.index].ox;
          this.imgDims[this.index].y = this.imgDims[this.index].oy;
          this.context.clearRect(0, 0, canvas.width, canvas.height);
          for(var i = 0; i < this.size; i++) {
            this.context.drawImage(this.imgDims[i].img, this.imgDims[i].x, this.imgDims[i].y, this.imgDims[i].width, this.imgDims[i].height);
            this.context.fillText(this.imgDims[i].name, this.imgDims[i].ox, this.imgDims[i].oy + this.imgDims[i].height + 10);
          }
        }
      });

      // console.log(this.canvasService.isToggled() + ' ' + this.index);
      // if(!this.canvasService.isToggled() && this.index >= 0) {
      //   this.index = -1;
      //   console.log(this.index);
      // }
    });

    document.addEventListener('mousemove', (ev) => {
      rect = canvas.getBoundingClientRect();
      var x = ev.clientX - rect.left;
      var y = ev.clientY - rect.top;
      // image selected and crossing boundary pass information
      if (this.canvasService.getImg() === '' && this.canvasService.isToggled() && this.canvasService.isPlantCanvas() && x > canvas.width && y > 0 && y < canvas.height) {
        this.canvasService.incrementSize();
        this.canvasService.toggleCanvas();
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        this.canvasService.toggleInitialize();
        this.canvasService.setImg(this.imgDims[this.index].img.src);
        this.canvasService.setId(this.imgDims[this.index].id);
      } else if (this.canvasService.getImg() === '' && this.canvasService.isPlantCanvas() && x > canvas.width && y > 0 && y < canvas.height) { // if no image then still signal change of canvas
        this.canvasService.toggleCanvas();
      } else if (this.canvasService.isToggled() && this.canvasService.isPlantCanvas()) { // otherwise in canvas still so update and draw
        this.imgDims[this.index].x = x - this.imgDims[this.index].width * .5;
        this.imgDims[this.index].y = y - this.imgDims[this.index].height * .5;
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < this.size; i++) {
          this.context.drawImage(this.imgDims[i].img, this.imgDims[i].x, this.imgDims[i].y, this.imgDims[i].width, this.imgDims[i].height);
          this.context.fillText(this.imgDims[i].name, this.imgDims[i].ox, this.imgDims[i].oy + this.imgDims[i].height + 10);
        }
      } else if(this.imgDims[this.index] !== undefined && this.canvasService.isToggled() && !this.canvasService.isPlantCanvas()) {
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < this.size; i++) {
          if(i !== this.index) {
          this.context.drawImage(this.imgDims[i].img, this.imgDims[i].x, this.imgDims[i].y, this.imgDims[i].width, this.imgDims[i].height);
          this.context.fillText(this.imgDims[i].name, this.imgDims[i].ox, this.imgDims[i].oy + this.imgDims[i].height + 10);
          }
        }
        this.context.fillText(this.imgDims[this.index].name, this.imgDims[this.index].ox, this.imgDims[this.index].oy + this.imgDims[this.index].height + 10);
      }
    });
  }

  ngOnInit() {
    this.plantService.getPlants()
      .subscribe(res => {
        this.plants = res;
        this.plants.forEach(plant => {
          plant.img = new Image();
          plant.img.src = plant.front_image_path;
        });
        this.plants[this.plants.length - 1].img.onload = () => {this.filterPlants()}
      });

      // this.getPlants();
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
    
    console.log(this.filteredPlants);
    

    this.filteredPlants.forEach(plant => {
      // if the image is mod 0 then begin pic on line
      if (this.size % 2 === 0) {
        this.imgDims[this.size] = {};
        // x is just the margin off
        this.imgDims[this.size].ox = margin;
        // y depends on the line size
        this.imgDims[this.size].oy = 10 + line * (size + 20);
        this.context.drawImage(plant.img, this.imgDims[this.size].ox, this.imgDims[this.size].oy, size, size);
        this.imgDims[this.size].x = this.imgDims[this.size].ox;
        this.imgDims[this.size].y = this.imgDims[this.size].oy;
        this.imgDims[this.size].width = size;
        this.imgDims[this.size].height = size;
        let canvas = document.getElementById('plant-list-canvas') as HTMLCanvasElement;
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

  getPlants() {
    this.plantService.getPlants()
      .subscribe(res => {
        this.plants = res;
        console.log(this.plants);
      });
  }

  filterPlants() {
    this.filteredPlants = this.plants;

    // SEASONS
    this.filteredPlants = this.filteredPlants.filter(plant => {
      var match = false;

      if (this.seasonFilters.spring && plant.seasons.includes("spring")) {
        match = true;
      }
      if (this.seasonFilters.summer && plant.seasons.includes("summer")) {
        match = true;
      }
      if (this.seasonFilters.fall && plant.seasons.includes("fall")) {
        match = true;
      }
      if (this.seasonFilters.winter && plant.seasons.includes("winter")) {
        match = true;
      }

      if (!this.seasonFilters.spring &&
          !this.seasonFilters.summer &&
          !this.seasonFilters.fall &&
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

      if (this.regionFilters.mountain && plant.regions.includes("mountain")) {
        match = true;
      }
      if (this.regionFilters.piedmont && plant.regions.includes("piedmont")) {
        match = true;
      }
      if (this.regionFilters.coast && plant.regions.includes("coast")) {
        match = true;
      }

      if (!this.regionFilters.mountain &&
          !this.regionFilters.piedmont &&
          !this.regionFilters.coast) {
        this.regionActive = false;
        return true;
      }

      this.regionActive = true;
      return match;
    });
    
    // COLORS
    this.filteredPlants = this.filteredPlants.filter(plant => {
      var match = false;

      if (this.colorFilters.red && plant.color === "red") {
        match = true;
      }
      if (this.colorFilters.blue && plant.color === "blue") {
        match = true;
      }
      if (this.colorFilters.purple && plant.color === "purple") {
        match = true;
      }
      if (this.colorFilters.pink && plant.color === "pink") {
        match = true;
      }
      if (this.colorFilters.yellow && plant.color === "yellow") {
        match = true;
      }
      if (this.colorFilters.white && plant.color === "white") {
        match = true;
      }
      if (this.colorFilters.orange && plant.color === "orange") {
        match = true;
      }
      if (this.colorFilters.green && plant.color === "green") {
        match = true;
      }
      if (this.colorFilters.other && plant.color === "other") {
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

    // TYPES
    this.filteredPlants = this.filteredPlants.filter(plant => {
      var match = false;

      if (this.typeFilters.vine && plant.plant_type === "vine") {
        match = true;
      }
      if (this.typeFilters.shrub && plant.plant_type === "shrub") {
        match = true;
      }
      if (this.typeFilters.annual && plant.plant_type === "annual") {
        match = true;
      }
      if (this.typeFilters.perennial && plant.plant_type === "perennial") {
        match = true;
      }

      if (!this.typeFilters.vine &&
          !this.typeFilters.shrub &&
          !this.typeFilters.annual &&
          !this.typeFilters.perennial) {
        this.typeActive = false;
        return true;
      }

      this.typeActive = true;
      return match;
    });

    // SOILS
    this.filteredPlants = this.filteredPlants.filter(plant => {
      var match = false;

      if (this.soilFilters.wet && plant.soil_types.includes("wet")) {
        match = true;
      }
      if (this.soilFilters.dry && plant.soil_types.includes("dry")) {
        match = true;
      }
      if (this.soilFilters.moist && plant.soil_types.includes("moist")) {
        match = true;
      }

      if (!this.soilFilters.wet &&
          !this.soilFilters.dry &&
          !this.soilFilters.moist) {
        this.soilActive = false;
        return true;
      }

      this.soilActive = true;
      return match;
    });

    // HEIGHT
    this.filteredPlants = this.filteredPlants.filter(plant => {
      var match = false;

      if (this.minHeight === undefined) {
        this.minHeight = 0;
      }
      if (this.maxHeight === undefined) {
        this.maxHeight = 20;
      }

      if (this.minHeight == 0 && this.maxHeight == 20) {
        this.heightActive = false;
      } else {
        this.heightActive = true;
      }

      if (plant.min_height >= this.minHeight && plant.max_height <= this.maxHeight) {
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

    console.log(this.filteredPlants);

    this.loadPlants();
  }

  clearFilter() {
    for (var property in this.seasonFilters) {
      this.seasonFilters[property] = false;
    }

    for (var property in this.regionFilters) {
      this.regionFilters[property] = false;
    }

    for (var property in this.colorFilters) {
      this.colorFilters[property] = false;
    }

    for (var property in this.typeFilters) {
      this.typeFilters[property] = false;
    }

    for (var property in this.soilFilters) {
      this.soilFilters[property] = false;
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

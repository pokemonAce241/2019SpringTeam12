import { Component, OnInit } from '@angular/core';
import { Plant, PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css']
})
export class PlantListComponent implements OnInit {

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

  constructor(
    private plantService: PlantService
  ) { }

  ngOnInit() {
    this.getPlants();
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
        return plant.common_name.includes(this.searchText);
      });
    }

    console.log(this.filteredPlants);
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

}

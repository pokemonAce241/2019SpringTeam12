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

  regionFilters = {
    "mountain": false,
    "piedmont": false,
    "coast": false
  }

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

  typeFilters = {
    "vine": false,
    "shrub": false,
    "perennial": false,
    "annual": false
  }

  soilFilters = {
    "wet": false,
    "moist": false,
    "dry": false
  }

  minHeight: number;
  maxHeight: number;

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

    this.filteredPlants = this.filteredPlants.filter(plant => {
      var match = true;

      // Season
      if (this.seasonFilters.spring && !plant.seasons.includes("spring")) {
        match = false;
      }
      if (this.seasonFilters.summer && !plant.seasons.includes("summer")) {
        match = false;
      }
      if (this.seasonFilters.fall && !plant.seasons.includes("fall")) {
        match = false;
      }
      if (this.seasonFilters.winter && !plant.seasons.includes("winter")) {
        match = false;
      }

      return match;
    });

    this.filteredPlants = this.filteredPlants.filter(plant => {
      var match = true;

      // Region
      if (this.regionFilters.mountain && !plant.regions.includes("mountain")) {
        match = false;
      }
      if (this.regionFilters.piedmont && !plant.regions.includes("piedmont")) {
        match = false;
      }
      if (this.regionFilters.coast && !plant.regions.includes("coast")) {
        match = false;
      }

      return match;
    });

    console.log(this.filteredPlants);
  }

}

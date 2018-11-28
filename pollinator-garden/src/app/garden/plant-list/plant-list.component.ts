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

  }

}

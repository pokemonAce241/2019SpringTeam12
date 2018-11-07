import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {Garden, GardenService } from 'src/app/services/garden.service';


@Component({
  selector: 'app-my-gardens',
  templateUrl: './my-gardens.component.html',
  styleUrls: ['./my-gardens.component.css'],
  providers: [GardenService]
})
export class MyGardensComponent implements OnInit {

  gardens: Garden[]

  constructor(
    private router: Router,
    private gardenService: GardenService
  ) { }

  ngOnInit() {
    this.getGardens()
  }

  getGardens() {
    this.gardenService.getGardens()
    .subscribe(res => {
      console.log(res);
      this.gardens = res;
    })
  }

}

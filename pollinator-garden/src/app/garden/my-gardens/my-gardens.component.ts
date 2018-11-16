import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {Garden, GardenService } from 'src/app/services/garden.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-my-gardens',
  templateUrl: './my-gardens.component.html',
  styleUrls: ['./my-gardens.component.css'],
  providers: [GardenService, NgbModal]
})
export class MyGardensComponent implements OnInit {

  gardens: Garden[]

  // Name of garden entered by user
  textValue: string

  // For now
  user_id = 1;

  constructor(
    private router: Router,
    private gardenService: GardenService,
    public modal: NgbModal
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

  public goToGarden(id: number) {
    this.router.navigate(['/garden', id]);
    this.modal.dismissAll();
    
  }

  public createNewGarden() {
    var garden: Garden = new Garden();
    garden.name = this.textValue;
    garden.user_id = this.user_id;

    // Need to check if name given is unique & if between 1 & 100 characters
    // error will be caught below
    this.gardenService.createGarden(garden)
    .subscribe(res => {
      this.goToGarden(res.id)
    })
  }

}

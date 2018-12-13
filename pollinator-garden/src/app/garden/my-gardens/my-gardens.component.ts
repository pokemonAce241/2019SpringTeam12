import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import {Garden, GardenService } from 'src/app/services/garden.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { htmlAstToRender3Ast } from '@angular/compiler/src/render3/r3_template_transform';

@Component({
  selector: 'app-my-gardens',
  templateUrl: './my-gardens.component.html',
  styleUrls: ['./my-gardens.component.css'],
  providers: [GardenService, NgbModal]
})
export class MyGardensComponent implements OnInit {
  @ViewChild('nameGardenModal') nameGardenModal: ElementRef;

  gardens: Garden[]

  // Name of garden entered by user
  textValue: string = ""

  // For now
  user_id = 1;

  lengthError: boolean = false
  uniqueNameError: boolean = false

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
    window.location.reload();
  }

  public createNewGarden() {
    var garden: Garden = new Garden();
    garden.name = this.textValue;
    garden.user_id = this.user_id;

    // Need to check for errors
    if (this.textValue.length > 50 || this.textValue.length < 1) {
      this.lengthError = true
    } else {
      this.lengthError = false
    }

    if (this.gardens.find(val => val.name === this.textValue) != undefined) {
      this.uniqueNameError = true
    } else {
      this.uniqueNameError = false
    }

    if (this.lengthError || this.uniqueNameError) {
      return
    }

    this.gardenService.createGarden(garden)
    .subscribe(res => {
      this.goToGarden(res.id)
    })
  }

  public deleteGarden(id: number) {
    if (confirm("Are you sure you want to delete this garden?").valueOf()) {
      this.gardenService.deleteGarden(id)
      .subscribe(res => {
        this.getGardens()
        alert("Garden has been deleted.")
        console.log("Garden " + id + "deleted.")
      })
    }
  }
  
  public cancelNameGardenModal() {
    this.lengthError = false;
    this.uniqueNameError = false;
    console.log(this.lengthError, this.uniqueNameError);
  }
}
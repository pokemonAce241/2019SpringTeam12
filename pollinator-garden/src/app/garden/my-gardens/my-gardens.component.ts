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
      //console.log(res);
      this.gardens = res;
    })
  }

  public goToGarden(id: number) {
    this.router.navigate(['/garden', id]);
    this.modal.dismissAll();
    // This is the page used for testing. Reloading the page forces the tests to run idefinitely
    // so this is a temporary fix
    //if (id !== 1) {
      window.location.reload();
    //}
  }

  public createNewGarden(gardenName : string) {
    var garden: Garden = new Garden();
    //garden.name = this.textValue;
    garden.name = gardenName;
    garden.user_id = this.user_id;

    // Make sure gardens list is not undefined
    //this.getGardens()

    // Need to check for errors
    if (gardenName.length > 50 || gardenName.length < 1) {
      this.lengthError = true
    } else {
      this.lengthError = false
    }

    if ((this.gardens !== [] && this.gardens !== undefined) && this.gardens.find(val => val.name === gardenName) != undefined) {
      this.uniqueNameError = true
    } else {
      this.uniqueNameError = false
    }

    if (this.lengthError || this.uniqueNameError) {
      return
    }

    this.gardenService.createGarden(garden)
    .subscribe(res => {
      console.log("Test")
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

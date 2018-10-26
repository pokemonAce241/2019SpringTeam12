import { Component, OnInit, ViewEncapsulation } from '@angular/core';


//note the icon height may have to be calculated based on the screen size. Right now it is base on font-size with a defualt size of 24px 

@Component({
  selector: 'app-main-garden',
  templateUrl: './main-garden.component.html',
  styleUrls: ['./main-garden.component.css', './icon.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainGardenComponent implements OnInit {

  constructor() { 
    
  }

  ngOnInit() {

  }

}
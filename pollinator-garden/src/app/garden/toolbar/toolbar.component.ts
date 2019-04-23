import { Component, OnInit } from '@angular/core';
import { GardenService } from 'src/app/services/garden.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private gardenService: GardenService) { 
    
  }

  ngOnInit() {
  }

  public perspectiveChange() {
    this.gardenService.viewChange();
  }

  public toggleSquareGarden() {
    this.gardenService.addSquareGarden();
  }

  public toggleCircleGarden() {
    this.gardenService.addCircleGarden();
  }

  public togglePaletteButton() {
    this.gardenService.changeColorButton();
  }

  public colorChanger() {
    this.gardenService.changeColor();
  }
}

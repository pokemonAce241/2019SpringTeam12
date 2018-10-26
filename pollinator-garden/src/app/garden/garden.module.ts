import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasComponent } from './canvas/canvas.component';
import { PlantListComponent } from './plant-list/plant-list.component';
import { MyGardensComponent } from './my-gardens/my-gardens.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MainGardenComponent } from './main-garden/main-garden.component';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [CanvasComponent, PlantListComponent, MyGardensComponent, ToolbarComponent, MainGardenComponent, SearchComponent],
  bootstrap: [MainGardenComponent]
})
export class GardenModule { }

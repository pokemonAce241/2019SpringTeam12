import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasComponent } from './canvas/canvas.component';
import { TopDownComponent } from './top-down/top-down.component';
import { PlantListComponent } from './plant-list/plant-list.component';
// import { MyGardensComponent } from './my-gardens/my-gardens.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MainGardenComponent } from './main-garden/main-garden.component';
import { RouterModule } from '@angular/router';
import {NgbModule, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule
  ],
  declarations: [CanvasComponent, TopDownComponent, PlantListComponent, ToolbarComponent, MainGardenComponent, SearchComponent],
  bootstrap: [MainGardenComponent],
  providers: [NgbModal]
})
export class GardenModule { }

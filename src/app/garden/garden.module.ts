import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasComponent } from './canvas/canvas.component';
import { PlantListComponent } from './plant-list/plant-list.component';
import { MyGardensComponent } from './my-gardens/my-gardens.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CanvasComponent, PlantListComponent, MyGardensComponent, FilterComponent]
})
export class GardenModule { }

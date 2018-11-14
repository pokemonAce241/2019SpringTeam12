import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CanvasTransitionService {
  private img: HTMLImageElement;
  private tog: boolean;         //short for toggle
  private plant: boolean;
  private divider: Number;
  constructor() { 
    this.img = new Image();
    this.tog = false;
    this.plant = true;
  }

  getImg(): HTMLImageElement {
    return this.img;
  }

  setImg(image : HTMLImageElement) {
    this.img = image;
  }

  isToggled(): boolean {
    return this.tog;
  }

  toggleSelected() {
    this.tog = !this.tog;
  }

  isPlantCanvas() {
    return this.plant;
  }

  toggleCanvas() {
    this.plant = !this.plant;
  }

  getDivider(): Number {
    return this.divider;
  }

  setDivider(divider: Number) {
    this.divider = divider;
  }
}

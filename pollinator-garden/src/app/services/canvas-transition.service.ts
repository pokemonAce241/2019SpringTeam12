import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CanvasTransitionService {
  private img: HTMLImageElement;
  private tog: boolean;         //short for toggle
  private plant: boolean;
  private fail: boolean;
  constructor() { 
    this.img = new Image();
    this.tog = false;
    this.plant = true;
    this.fail = false;
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

  isFail(): boolean {
    return this.fail;
  }

  toggleFail(fail: boolean) {
    this.fail = fail;
  }
}

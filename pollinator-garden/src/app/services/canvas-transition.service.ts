import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CanvasTransitionService {
  private img: string;
  private id: number;
  private tog: boolean;         //short for toggle
  private plant: boolean;
  private reset: boolean;
  private initialize: boolean;
  private size: any;

  constructor() { 
    this.img = '';
    this.tog = false;
    this.plant = true;
    this.reset = false;
    this.initialize = false;
    this.size = 0;
  }

  getImg(): string {
    return this.img;
  }

  setImg(image : string) {
    this.img = image;
  }

  getId(): number {
    return this.id;
  }

  setId(id: number) {
    this.id = id;
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

  isReset(): boolean {
    return this.reset;
  }

  toggleReset() {
    this.reset = !this.reset;
  }

  isInitialize() {
    return this.initialize;
  }

  toggleInitialize() {
    this.initialize = !this.initialize;
  }

  incrementSize() {
    this.size++;
  }

  decrementSize() {
    this.size--;
  }

  getSize() {
    return this.size;
  }
}

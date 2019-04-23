import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

export class Garden {
  id: number;
  name: string;
  user_id: number;
  user_email: string;
  date_created: string;
  date_modified: string;
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GardenService {

  private isTopDown: boolean;
  private canvas_img : any;
  // Observable for changing perspectives
  private viewChangeCallSource = new Subject<any>();
  viewChangeCalled$ = this.viewChangeCallSource.asObservable();

  private curvedLineOn: boolean;
  private circleToolOn: boolean;
  private squareToolOn: boolean;

  constructor(
    private http: HttpClient
  ) {
    this.isTopDown = true;
    this.curvedLineOn = false;
    this.circleToolOn = false;
    this.squareToolOn = false;
    this.canvas_img = "src\\assets\\site-images\\image_placeholder.png";
  }

  baseUrl = "http://localhost:3000/";
  gardenUrl = "gardens/"

  getGardensForUser(user_id: number): Observable<Garden[]> {
    return this.http.get<Garden[]>(this.baseUrl + this.gardenUrl);
  }

  getGardens(): Observable<Garden[]> {
    return this.http.get<Garden[]>(this.baseUrl + this.gardenUrl);
  }

  createGarden(garden: Garden): Observable<Garden> {
    return this.http.post<Garden>(this.baseUrl + this.gardenUrl, garden, httpOptions).pipe(
      catchError(val => {
        console.log(val);
        return of(garden);
      })
    );
  }

  viewChange() {
    this.isTopDown = !this.isTopDown;
    this.viewChangeCallSource.next();
  }

  toggleCurvedLine() {
    this.curvedLineOn = !this.curvedLineOn;
    this.circleToolOn = false;
    this.squareToolOn = false;
    console.log("Curved Line On: " + this.curvedLineOn);
  }

  isCurvedLine() {
    return this.curvedLineOn;
  }

  toggleCircleTool() {
    this.circleToolOn = !this.circleToolOn;
    this.squareToolOn = false;
    this.curvedLineOn = false;
    console.log("Circle Tool On: " + this.circleToolOn);
  }

  isCircleTool() {
    return this.circleToolOn;
  }

  toggleSquareTool() {
    this.squareToolOn = !this.squareToolOn;
    this.circleToolOn = false;
    this.curvedLineOn = false;
    console.log("Square Tool On: " + this.squareToolOn);
  }

  isSquareTool() {
    return this.squareToolOn;
  }

  isTopDownPerspective() {
    return this.isTopDown;
  }

  setCanvasImage(image : any) {
    this.canvas_img = image;
  }

  getCanvasImage() {
    console.log(this.canvas_img);
    return this.canvas_img;
  }

  deleteGarden(gardenId: number): Observable<Garden> {
    return this.http.delete<Garden>(this.baseUrl + this.gardenUrl + gardenId);
  }

}

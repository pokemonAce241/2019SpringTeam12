import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  private changeView: boolean;

  constructor(
    private http: HttpClient
  ) { 
    this.changeView = false;
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
    console.log("Pineapple")
    this.changeView = !this.changeView;
  }

  getPerspective() {
    return this.changeView;
  }

  deleteGarden(gardenId: number): Observable<Garden> {
    return this.http.delete<Garden>(this.baseUrl + this.gardenUrl + gardenId);
  }

}


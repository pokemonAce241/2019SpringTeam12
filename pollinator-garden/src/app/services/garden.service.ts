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

@Injectable()
export class GardenService {

  constructor(
    private http: HttpClient
  ) { }

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

}


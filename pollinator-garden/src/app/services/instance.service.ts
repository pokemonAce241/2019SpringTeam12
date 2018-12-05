import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

export class PlantInstance {
  id: number;
  x: number;
  y: number;
  front_image_path: string;
  side_image_path: string;
  plant_id: number;
  garden_id: number;
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class InstanceService {

  constructor(
    private http: HttpClient
  ) { }

  baseUrl = "http://localhost:3000/";
  instancesUrl = "instances/garden/"

  getInstances(garden_id: number): Observable<PlantInstance[]> {
    return this.http.get<PlantInstance[]>(this.baseUrl + this.instancesUrl + garden_id);
  }

  createInstance(instance: PlantInstance): Observable<PlantInstance> {
    return this.http.post<PlantInstance>(this.baseUrl + "instances", instance, httpOptions).pipe(
      catchError(val => {
        console.log(val);
        return of(instance);
      })
    );
  }

  updateInstance(instance: PlantInstance): Observable<PlantInstance> {
    return this.http.put<PlantInstance>(this.baseUrl + "instances/" + instance.id, instance, httpOptions).pipe(
      catchError(val => {
        console.log(val);
        return of(instance);
      })
    );
  }
}

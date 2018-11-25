import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class PlantInstance {
  x: number;
  y: number;
  front_image_path: string;
  side_image_path: string;
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
}

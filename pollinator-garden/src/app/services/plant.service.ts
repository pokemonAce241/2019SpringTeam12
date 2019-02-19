import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class Plant {
  id: number;
  common_name: string;
  genus: string;
  species: string;
  min_height: number;
  max_height: number;
  min_spread: number;
  max_spread: number;
  plant_type: string;
  type_id: number;
  native: boolean;
  min_hardiness: number;
  max_hardiness: number;
  color: string;
  color_id: number;
  front_image_path: string;
  side_image_path: string;
  seasons: string[];
  regions: string[];
  soil_types: string[];
  img: any;
  espring: boolean;
  lspring: boolean;
  esummer: boolean;
  lsummer: boolean;
  efall: boolean;
  lfall: boolean;
  winter: boolean;
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  baseUrl = "http://localhost:3000/";
  plantUrl = "plants/"

  constructor(
    private http: HttpClient
  ) { }

  getPlants(): Observable<Plant[]> {
    return this.http.get<Plant[]>(this.baseUrl + this.plantUrl);
  }
}

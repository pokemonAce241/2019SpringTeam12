import { TestBed } from '@angular/core/testing';

import { PlantService } from './plant.service';
import { HttpClient } from 'selenium-webdriver/http';

describe('PlantService', () => {

  const httpSpy = jasmine.createSpyObj('HttpClient', ['get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpSpy }
      ]
    })
  });

  it('should be created', () => {
    const service: PlantService = new PlantService(httpSpy);
    expect(service).toBeTruthy();
  });
});

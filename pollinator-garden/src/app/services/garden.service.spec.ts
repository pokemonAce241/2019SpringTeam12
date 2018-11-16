import { TestBed } from '@angular/core/testing';

import { GardenService } from './garden.service';
import { HttpClient } from '@angular/common/http';

describe('GardenService', () => {

  const httpSpy = jasmine.createSpyObj('HttpClient', ['get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpSpy }
      ]
    })
  });

  it('should be created', () => {
    const service: GardenService = new GardenService(httpSpy);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { } from 'jasmine';
import { GardenService, Garden } from './garden.service';
import { HttpClient } from '@angular/common/http';

describe('GardenService', () => {

  const httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  httpSpy.post.and.returnValue(of({}));

  let service: GardenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpSpy }
      ]
    })
    
  });

  it('should be created', () => {
    service = new GardenService(httpSpy);
    expect(service).toBeTruthy();
  });

  it('should return a list of gardens', () => {
    service = new GardenService(httpSpy);
    
    service.getGardens();
    expect(httpSpy.get.calls.any()).toBe(true, 'get called');
  });

  it('should return a list of gardens for a user', () => {
    service = new GardenService(httpSpy);

    service.getGardensForUser(1);
    expect(httpSpy.get.calls.any()).toBe(true, 'get called');
  });

  it('should create a new garden', () => {
    service = new GardenService(httpSpy);

    service.createGarden(new Garden());
    expect(httpSpy.post.calls.any()).toBe(true, 'post called');
  });
});

import { TestBed } from '@angular/core/testing';

import { InstanceService } from './instance.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('InstanceService', () => {

  const httpSpy = jasmine.createSpyObj('HttpClient', ['get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpSpy }
      ]
    })
  });

  it('should be created', () => {
    const service: InstanceService = new InstanceService(httpSpy);
    expect(service).toBeTruthy();
  });
});

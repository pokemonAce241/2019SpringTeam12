import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGardensComponent } from './my-gardens.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { GardenService } from 'src/app/services/garden.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('MyGardensComponent', () => {
  let component: MyGardensComponent;
  let fixture: ComponentFixture<MyGardensComponent>;

  let modalServiceSpy: jasmine.SpyObj<NgbModal>;
  let routerServiceSpy: jasmine.SpyObj<Router>;
  let gardenServiceSpy: jasmine.SpyObj<GardenService>;

  beforeEach(async(() => {

    const modalSpy = jasmine.createSpyObj('NgbModal', ['dismissAll']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const gardenSpy = jasmine.createSpyObj('GardenService', ['getGardens']);

    TestBed.configureTestingModule({
      declarations: [ MyGardensComponent ],
      providers: [
        { provide: GardenService, useValue: gardenSpy },
        { provide: Router, useValue: routerSpy }
      ],
      imports: [FormsModule, HttpClientTestingModule]
    })
    .compileComponents();

    modalServiceSpy = TestBed.get(NgbModal);
    gardenServiceSpy = TestBed.get(GardenService);
    routerServiceSpy = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGardensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { CanvasComponent } from './canvas.component';
import { InstanceService } from 'src/app/services/instance.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { MainGardenComponent } from '../main-garden/main-garden.component';

@Component({selector: 'app-search', template: ''})
class SearchComponentStub {}

@Component({selector: 'app-plant-list', template: ''})
class PlantListComponentStub {}

@Component({selector: 'app-toolbar', template: ''})
class ToolbarComponentStub {}

describe('CanvasComponent', () => {
  let component: MainGardenComponent;
  let fixture: ComponentFixture<MainGardenComponent>;
  let canvas: CanvasComponent;

  let routerServiceSpy: jasmine.SpyObj<Router>;
  let instanceServiceSpy: jasmine.SpyObj<InstanceService>;

  let testInstances;

  beforeEach(async(() => {

    testInstances = [
      {
        "id": 1,
        "garden_id": 1,
        "plant_id": 1,
        "front_image_path": "assets/images/plant1.jpg",
        "side_image_path": "assets/images/plant1.jpg",
        "x": 100,
        "y": 100
      }
    ];

    const instanceService = jasmine.createSpyObj('InstanceService', ['getInstances']);
    instanceService.getInstances.and.returnValue( of(testInstances) );

    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    // routerSpy.navigate.and.returnValue();

    TestBed.configureTestingModule({
      declarations: [ CanvasComponent, MainGardenComponent, SearchComponentStub, PlantListComponentStub, ToolbarComponentStub ],
      providers: [
        { provide: InstanceService, useValue: instanceService },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: { params: of({id: 1}) } }
      ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    routerServiceSpy = TestBed.get(Router);
    instanceServiceSpy = TestBed.get(InstanceService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainGardenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    canvas = fixture.debugElement.query(By.directive(CanvasComponent)).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(canvas).toBeTruthy();
  });

  it('should navigate to shopping list', () => {
    canvas.goToShoppingList();
    expect(routerServiceSpy.navigate.calls.count()).toBe(1, 'Router.navigate called 1 time');
  });

  it('should get a list of instances from the service', (done: DoneFn) => {
    instanceServiceSpy.getInstances().subscribe(value => {
      expect(value).toBe(testInstances, 'Instances value');
      done();
    });
  });

  it('should draw', (done: DoneFn) => {
    instanceServiceSpy.getInstances().subscribe(value => {
      expect(value).toBe(testInstances, 'Instances value');
      canvas.plant_instances = value;
      done();
    });

    canvas.draw();
  });
});

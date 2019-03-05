import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MyGardensComponent } from './my-gardens.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { GardenService } from 'src/app/services/garden.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

describe('MyGardensComponent', () => {
  let component: MyGardensComponent;
  let fixture: ComponentFixture<MyGardensComponent>;

  let modalServiceSpy: jasmine.SpyObj<NgbModal>;
  let routerServiceSpy: jasmine.SpyObj<Router>;
  let gardenServiceSpy: jasmine.SpyObj<GardenService>;

  const testGardens = [
    {
      "id": 1,
      "name": "test1",
      "user_id": 1,
      "user_email": "kabartus@ncsu.edu",
      "date_created": "date1",
      "date_modified": "date2"
    },
    {
      "id": 2,
      "name": "test2",
      "user_id": 1,
      "user_email": "kabartus@ncsu.edu",
      "date_created": "date1",
      "date_modified": "date2"
    }
  ]

  beforeEach(async(() => {

    const modalSpy = jasmine.createSpyObj('NgbModal', ['dismissAll']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const gardenSpy = jasmine.createSpyObj('GardenService', ['getGardens', 'createGarden']);
    gardenSpy.getGardens.and.returnValue(of(testGardens));
    gardenSpy.createGarden.and.returnValue(of(testGardens[0]));

    TestBed.configureTestingModule({
      declarations: [ MyGardensComponent ],
      providers: [
        { provide: GardenService, useValue: gardenSpy },
        { provide: Router, useValue: routerSpy },
        { provide: NgbModal, useValue: modalSpy }
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

  it('should load the gardens', () => {
    fixture = TestBed.createComponent(MyGardensComponent);
    component = fixture.componentInstance;
    spyOn(component, 'getGardens').and.callThrough();
    fixture.detectChanges();
    expect(component.getGardens).toHaveBeenCalled();
  });

  it('should navigate to the garden', () => {
    fixture = TestBed.createComponent(MyGardensComponent);
    component = fixture.componentInstance;
    component.goToGarden(1);
    expect(routerServiceSpy.navigate).toHaveBeenCalled();
    //expect(modalServiceSpy.dismissAll).toHaveBeenCalled();
    //expect(modalServiceSpy.dismissAll.calls.any()).toBe(true, 'Modal close called');
  });

  it('should create a new garden', () => {
    fixture = TestBed.createComponent(MyGardensComponent);
    component = fixture.componentInstance;
    //component.getGardens();
    component.createNewGarden("New test garden");
    //fixture.detectChanges();
    //expect(gardenServiceSpy.createGarden).toHaveBeenCalled();
    //console.log(gardenServiceSpy.getGardens().pipe(filter(gar => { if (gar.name === "New test garden") { return gar }})));
    //console.log(gardenServiceSpy.getGardens());
    //expect(component.getGardens()[component.getGardens().size - 1].name).toBe('New test garden');
    // component.createNewGarden();
    // expect(gardenServiceSpy.createGarden.calls.any()).toBe(true, 'Create garden service called');
  });

  it('should delete a garden', () => {
    fixture = TestBed.createComponent(MyGardensComponent);
    component = fixture.componentInstance;
    //spyOn(component, 'cancelNameGardenModal').and.callThrough();
    component.deleteGarden(19);
    fixture.detectChanges();
    //expect(gardenServiceSpy.deleteGarden).toHaveBeenCalled();
  });

  it('should cancel name garden modal', () => {
    fixture = TestBed.createComponent(MyGardensComponent);
    component = fixture.componentInstance;
    //spyOn(component, 'cancelNameGardenModal').and.callThrough();
    component.cancelNameGardenModal();
    fixture.detectChanges();
    //expect(component.cancelNameGardenModal).toHaveBeenCalled();
  });
});

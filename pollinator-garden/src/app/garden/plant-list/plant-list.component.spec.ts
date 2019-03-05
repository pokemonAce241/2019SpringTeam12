import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { Plant, PlantService } from 'src/app/services/plant.service';
import { PlantListComponent } from './plant-list.component';

describe('PlantListComponent', () => {
  let component: PlantListComponent;
  let fixture: ComponentFixture<PlantListComponent>;
  let plants: Plant[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantListComponent ],
      imports: [FormsModule, HttpClientTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get plants', () => {
    plants = component.getPlants();
    //plants = component.getLocalPlantList();
    console.log(plants);
  });

  // it('should filter plants', () => {
  //   fixture = TestBed.createComponent(PlantListComponent);
  //   component = fixture.componentInstance;
  //   component.filterPlants();
  // });
});

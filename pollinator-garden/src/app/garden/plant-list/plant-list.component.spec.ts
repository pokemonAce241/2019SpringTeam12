import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, SelectMultipleControlValueAccessor } from '@angular/forms';
import { Plant, PlantService } from 'src/app/services/plant.service';
import { PlantListComponent } from './plant-list.component';
import { CodegenComponentFactoryResolver } from '@angular/core/src/linker/component_factory_resolver';

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

  it('should reset filter', () => {
    component.loadPlants();
    component.ngOnInit();
    component.ngAfterViewInit();
    component.clearRegionFilter();
    component.clearNativeFilter();
    component.clearSoilFilter();
    component.clearTypeFilter();
    component.plantType = "annual";
    component.plantRegion = "mountain"
    
    component.soilFilters = {
      "moist": true,
      "dry": false,
      "wet":false};
    component.colorFilters = {
      "red": true,
      "blue": false,
      "purple": false,
      "pink": false,
      "yellow": false,
      "white": false,
      "orange": false,
      "green": false,
      "other": false
    }
    component.soilActive = true;
    component.clearFilter();
    //component.clearRegionFilter();
    component.updateReset();
    
  });
});

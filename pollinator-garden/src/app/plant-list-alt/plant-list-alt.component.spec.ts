import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantListAltComponent } from './plant-list-alt.component';

describe('PlantListAltComponent', () => {
  let component: PlantListAltComponent;
  let fixture: ComponentFixture<PlantListAltComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantListAltComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantListAltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { MainGardenComponent } from './main-garden.component';

@Component({selector: 'app-search', template: ''})
class SearchComponentStub {}

@Component({selector: 'app-plant-list', template: ''})
class PlantListComponentStub {}

@Component({selector: 'app-toolbar', template: ''})
class ToolbarComponentStub {}

@Component({selector: 'app-canvas', template: ''})
class CanvasComponentStub {}

describe('MainGardenComponent', () => {
  let component: MainGardenComponent;
  let fixture: ComponentFixture<MainGardenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainGardenComponent, SearchComponentStub, PlantListComponentStub, ToolbarComponentStub, CanvasComponentStub ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainGardenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

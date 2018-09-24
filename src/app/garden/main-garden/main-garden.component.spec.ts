import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainGardenComponent } from './main-garden.component';

describe('MainGardenComponent', () => {
  let component: MainGardenComponent;
  let fixture: ComponentFixture<MainGardenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainGardenComponent ]
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

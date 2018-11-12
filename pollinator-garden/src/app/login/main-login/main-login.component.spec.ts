import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLoginComponent } from './main-login.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

describe('MainLoginComponent', () => {
  let component: MainLoginComponent;
  let fixture: ComponentFixture<MainLoginComponent>;

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainLoginComponent ],
      imports: [ FormsModule ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

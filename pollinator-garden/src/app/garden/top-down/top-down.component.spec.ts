import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopDownComponent } from './top-down.component';

describe('TopDownComponent', () => {
  let component: TopDownComponent;
  let fixture: ComponentFixture<TopDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

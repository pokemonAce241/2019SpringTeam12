import { TestBed } from '@angular/core/testing';

import { CanvasTransitionService } from './canvas-transition.service';

describe('CanvasTransitionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanvasTransitionService = TestBed.get(CanvasTransitionService);
    expect(service).toBeTruthy();
  });
});

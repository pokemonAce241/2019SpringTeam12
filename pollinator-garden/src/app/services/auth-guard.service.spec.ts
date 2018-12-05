import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth-guard.service';
import { Router } from '@angular/router';

describe('AuthGuard', () => {

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => TestBed.configureTestingModule({
    declarations: [ ],
    providers: [
      { provide: Router, useValue: routerSpy }
    ],
    imports: [ ]
  }));

  it('should be created', () => {
    const service: AuthGuard = new AuthGuard(routerSpy);
    expect(service).toBeTruthy();
  });
});

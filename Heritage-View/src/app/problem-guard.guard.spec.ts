import { TestBed } from '@angular/core/testing';

import { ProblemGuardGuard } from './problem-guard.guard';

describe('ProblemGuardGuard', () => {
  let guard: ProblemGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProblemGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

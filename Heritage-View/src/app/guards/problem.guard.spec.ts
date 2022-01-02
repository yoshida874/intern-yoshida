import { TestBed } from '@angular/core/testing';

import { ProblemGuard } from './problem.guard';

describe('ProblemGuard', () => {
  let guard: ProblemGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProblemGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { PontomaisGuard } from './pontomais.guard';

describe('PontomaisGuard', () => {
  let guard: PontomaisGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PontomaisGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

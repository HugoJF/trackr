import { TestBed } from '@angular/core/testing';

import { PontomaisService } from './pontomais.service';

describe('PontomaisService', () => {
  let service: PontomaisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PontomaisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

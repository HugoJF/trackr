import { TestBed } from '@angular/core/testing';

import { CredentialsRepositoryService } from './credentials-repository.service';

describe('CredentialsRepositoryService', () => {
  let service: CredentialsRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CredentialsRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

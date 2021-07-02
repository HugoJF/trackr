import { TestBed } from '@angular/core/testing';

import { LocalstorageCredentialsRepositoryService } from './localstorage-credentials-repository.service';

describe('LocalstorageCredentialsRepositoryService', () => {
  let service: LocalstorageCredentialsRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalstorageCredentialsRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { HttpClaimService } from './http-claim.service';

describe('HttpClaimService', () => {
  let service: HttpClaimService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpClaimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

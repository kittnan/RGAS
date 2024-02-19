import { TestBed } from '@angular/core/testing';

import { HttpDCdService } from './http-d-cd.service';

describe('HttpDCdService', () => {
  let service: HttpDCdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpDCdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

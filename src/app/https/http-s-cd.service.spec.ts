import { TestBed } from '@angular/core/testing';

import { HttpSCdService } from './http-s-cd.service';

describe('HttpSCdService', () => {
  let service: HttpSCdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpSCdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

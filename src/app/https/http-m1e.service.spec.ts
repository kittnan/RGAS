import { TestBed } from '@angular/core/testing';

import { HttpM1eService } from './http-m1e.service';

describe('HttpM1eService', () => {
  let service: HttpM1eService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpM1eService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

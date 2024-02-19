import { TestBed } from '@angular/core/testing';

import { HttpLCdService } from './http-l-cd.service';

describe('HttpLCdService', () => {
  let service: HttpLCdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpLCdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { HttpResultService } from './http-result.service';

describe('HttpResultService', () => {
  let service: HttpResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

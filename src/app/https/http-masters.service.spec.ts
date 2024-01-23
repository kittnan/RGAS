import { TestBed } from '@angular/core/testing';

import { HttpMastersService } from './http-masters.service';

describe('HttpMastersService', () => {
  let service: HttpMastersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpMastersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

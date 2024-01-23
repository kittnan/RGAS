import { TestBed } from '@angular/core/testing';

import { HttpDefectService } from './http-defect.service';

describe('HttpDefectService', () => {
  let service: HttpDefectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpDefectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

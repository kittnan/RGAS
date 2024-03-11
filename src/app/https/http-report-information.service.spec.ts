import { TestBed } from '@angular/core/testing';

import { HttpReportInformationService } from './http-report-information.service';

describe('HttpReportInformationService', () => {
  let service: HttpReportInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpReportInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

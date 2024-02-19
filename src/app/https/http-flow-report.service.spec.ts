import { TestBed } from '@angular/core/testing';

import { HttpFlowReportService } from './http-flow-report.service';

describe('HttpFlowReportService', () => {
  let service: HttpFlowReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpFlowReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

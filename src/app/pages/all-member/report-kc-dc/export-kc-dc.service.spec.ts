import { TestBed } from '@angular/core/testing';

import { ExportKcDcService } from './export-kc-dc.service';

describe('ExportKcDcService', () => {
  let service: ExportKcDcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportKcDcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

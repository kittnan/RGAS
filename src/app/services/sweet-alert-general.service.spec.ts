import { TestBed } from '@angular/core/testing';

import { SweetAlertGeneralService } from './sweet-alert-general.service';

describe('SweetAlertGeneralService', () => {
  let service: SweetAlertGeneralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SweetAlertGeneralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

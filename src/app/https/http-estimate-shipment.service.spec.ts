import { TestBed } from '@angular/core/testing';

import { HttpEstimateShipmentService } from './http-estimate-shipment.service';

describe('HttpEstimateShipmentService', () => {
  let service: HttpEstimateShipmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpEstimateShipmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

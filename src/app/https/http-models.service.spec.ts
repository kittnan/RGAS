import { TestBed } from '@angular/core/testing';

import { HttpModelsService } from './http-models.service';

describe('HttpModelsService', () => {
  let service: HttpModelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpModelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

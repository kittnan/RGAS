import { TestBed } from '@angular/core/testing';

import { HttpModelsCommonService } from './http-models-common.service';

describe('HttpModelsCommonService', () => {
  let service: HttpModelsCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpModelsCommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

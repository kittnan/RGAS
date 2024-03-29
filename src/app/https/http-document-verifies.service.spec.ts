import { TestBed } from '@angular/core/testing';

import { HttpDocumentVerifiesService } from './http-document-verifies.service';

describe('HttpDocumentVerifiesService', () => {
  let service: HttpDocumentVerifiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpDocumentVerifiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

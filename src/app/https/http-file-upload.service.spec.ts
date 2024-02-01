import { TestBed } from '@angular/core/testing';

import { HttpFileUploadService } from './http-file-upload.service';

describe('HttpFileUploadService', () => {
  let service: HttpFileUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpFileUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

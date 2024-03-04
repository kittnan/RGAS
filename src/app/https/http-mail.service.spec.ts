import { TestBed } from '@angular/core/testing';

import { HttpMailService } from './http-mail.service';

describe('HttpMailService', () => {
  let service: HttpMailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpMailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

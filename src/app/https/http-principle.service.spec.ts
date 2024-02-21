import { TestBed } from '@angular/core/testing';

import { HttpPrincipleService } from './http-principle.service';

describe('HttpPrincipleService', () => {
  let service: HttpPrincipleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpPrincipleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

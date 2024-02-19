import { TestBed } from '@angular/core/testing';

import { SectionGuard } from './section.guard';

describe('SectionGuard', () => {
  let guard: SectionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SectionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

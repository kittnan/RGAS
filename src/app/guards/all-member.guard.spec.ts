import { TestBed } from '@angular/core/testing';

import { AllMemberGuard } from './all-member.guard';

describe('AllMemberGuard', () => {
  let guard: AllMemberGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AllMemberGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

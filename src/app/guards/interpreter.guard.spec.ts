import { TestBed } from '@angular/core/testing';

import { InterpreterGuard } from './interpreter.guard';

describe('InterpreterGuard', () => {
  let guard: InterpreterGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InterpreterGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

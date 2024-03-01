import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpreterRgas1Component } from './interpreter-rgas1.component';

describe('InterpreterRgas1Component', () => {
  let component: InterpreterRgas1Component;
  let fixture: ComponentFixture<InterpreterRgas1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterpreterRgas1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterpreterRgas1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

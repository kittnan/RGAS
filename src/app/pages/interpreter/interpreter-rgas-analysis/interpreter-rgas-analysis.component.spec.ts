import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpreterRgasAnalysisComponent } from './interpreter-rgas-analysis.component';

describe('InterpreterRgasAnalysisComponent', () => {
  let component: InterpreterRgasAnalysisComponent;
  let fixture: ComponentFixture<InterpreterRgasAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterpreterRgasAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterpreterRgasAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

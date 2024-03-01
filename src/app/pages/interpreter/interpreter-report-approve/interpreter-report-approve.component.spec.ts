import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpreterReportApproveComponent } from './interpreter-report-approve.component';

describe('InterpreterReportApproveComponent', () => {
  let component: InterpreterReportApproveComponent;
  let fixture: ComponentFixture<InterpreterReportApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterpreterReportApproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterpreterReportApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

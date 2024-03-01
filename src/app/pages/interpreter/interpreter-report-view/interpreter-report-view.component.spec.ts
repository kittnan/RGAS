import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpreterReportViewComponent } from './interpreter-report-view.component';

describe('InterpreterReportViewComponent', () => {
  let component: InterpreterReportViewComponent;
  let fixture: ComponentFixture<InterpreterReportViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterpreterReportViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterpreterReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

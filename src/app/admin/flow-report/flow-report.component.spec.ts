import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowReportComponent } from './flow-report.component';

describe('FlowReportComponent', () => {
  let component: FlowReportComponent;
  let fixture: ComponentFixture<FlowReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

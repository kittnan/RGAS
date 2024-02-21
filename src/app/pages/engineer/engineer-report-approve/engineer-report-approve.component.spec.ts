import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerReportApproveComponent } from './engineer-report-approve.component';

describe('EngineerReportApproveComponent', () => {
  let component: EngineerReportApproveComponent;
  let fixture: ComponentFixture<EngineerReportApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineerReportApproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineerReportApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

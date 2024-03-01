import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentReportApproveComponent } from './department-report-approve.component';

describe('DepartmentReportApproveComponent', () => {
  let component: DepartmentReportApproveComponent;
  let fixture: ComponentFixture<DepartmentReportApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentReportApproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentReportApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

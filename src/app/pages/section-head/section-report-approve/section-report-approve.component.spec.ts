import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionReportApproveComponent } from './section-report-approve.component';

describe('SectionReportApproveComponent', () => {
  let component: SectionReportApproveComponent;
  let fixture: ComponentFixture<SectionReportApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionReportApproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionReportApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

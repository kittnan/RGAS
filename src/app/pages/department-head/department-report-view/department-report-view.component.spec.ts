import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentReportViewComponent } from './department-report-view.component';

describe('DepartmentReportViewComponent', () => {
  let component: DepartmentReportViewComponent;
  let fixture: ComponentFixture<DepartmentReportViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentReportViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

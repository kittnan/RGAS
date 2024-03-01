import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentRgasAnalysisComponent } from './department-rgas-analysis.component';

describe('DepartmentRgasAnalysisComponent', () => {
  let component: DepartmentRgasAnalysisComponent;
  let fixture: ComponentFixture<DepartmentRgasAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentRgasAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentRgasAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

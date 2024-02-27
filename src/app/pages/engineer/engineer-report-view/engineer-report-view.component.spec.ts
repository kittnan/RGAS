import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerReportViewComponent } from './engineer-report-view.component';

describe('EngineerReportViewComponent', () => {
  let component: EngineerReportViewComponent;
  let fixture: ComponentFixture<EngineerReportViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineerReportViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineerReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

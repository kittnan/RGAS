import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionReportViewComponent } from './section-report-view.component';

describe('SectionReportViewComponent', () => {
  let component: SectionReportViewComponent;
  let fixture: ComponentFixture<SectionReportViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionReportViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

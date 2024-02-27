import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionRgasAnalysisComponent } from './section-rgas-analysis.component';

describe('SectionRgasAnalysisComponent', () => {
  let component: SectionRgasAnalysisComponent;
  let fixture: ComponentFixture<SectionRgasAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionRgasAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionRgasAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

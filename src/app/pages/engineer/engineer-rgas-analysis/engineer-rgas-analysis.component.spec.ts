import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerRgasAnalysisComponent } from './engineer-rgas-analysis.component';

describe('EngineerRgasAnalysisComponent', () => {
  let component: EngineerRgasAnalysisComponent;
  let fixture: ComponentFixture<EngineerRgasAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineerRgasAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineerRgasAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

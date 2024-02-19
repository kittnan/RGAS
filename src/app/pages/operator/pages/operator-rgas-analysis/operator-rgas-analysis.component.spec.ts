import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorRgasAnalysisComponent } from './operator-rgas-analysis.component';

describe('OperatorRgasAnalysisComponent', () => {
  let component: OperatorRgasAnalysisComponent;
  let fixture: ComponentFixture<OperatorRgasAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatorRgasAnalysisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperatorRgasAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorReportKcDcComponent } from './operator-report-kc-dc.component';

describe('OperatorReportKcDcComponent', () => {
  let component: OperatorReportKcDcComponent;
  let fixture: ComponentFixture<OperatorReportKcDcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatorReportKcDcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperatorReportKcDcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

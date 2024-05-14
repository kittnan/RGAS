import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportKcDcComponent } from './report-kc-dc.component';

describe('ReportKcDcComponent', () => {
  let component: ReportKcDcComponent;
  let fixture: ComponentFixture<ReportKcDcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportKcDcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportKcDcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

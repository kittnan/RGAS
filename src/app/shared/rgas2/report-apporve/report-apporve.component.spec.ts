import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportApporveComponent } from './report-apporve.component';

describe('ReportApporveComponent', () => {
  let component: ReportApporveComponent;
  let fixture: ComponentFixture<ReportApporveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportApporveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportApporveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorReportViewComponent } from './operator-report-view.component';

describe('OperatorReportViewComponent', () => {
  let component: OperatorReportViewComponent;
  let fixture: ComponentFixture<OperatorReportViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatorReportViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperatorReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

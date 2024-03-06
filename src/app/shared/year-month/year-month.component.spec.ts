import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearMonthComponent } from './year-month.component';

describe('YearMonthComponent', () => {
  let component: YearMonthComponent;
  let fixture: ComponentFixture<YearMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearMonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YearMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

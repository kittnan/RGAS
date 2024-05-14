import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerCustomComponent } from './date-picker-custom.component';

describe('DatePickerCustomComponent', () => {
  let component: DatePickerCustomComponent;
  let fixture: ComponentFixture<DatePickerCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatePickerCustomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatePickerCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

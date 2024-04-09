import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestRgas1Component } from './guest-rgas1.component';

describe('GuestRgas1Component', () => {
  let component: GuestRgas1Component;
  let fixture: ComponentFixture<GuestRgas1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestRgas1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestRgas1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

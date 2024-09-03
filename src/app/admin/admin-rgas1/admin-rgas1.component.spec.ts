import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRgas1Component } from './admin-rgas1.component';

describe('AdminRgas1Component', () => {
  let component: AdminRgas1Component;
  let fixture: ComponentFixture<AdminRgas1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRgas1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRgas1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

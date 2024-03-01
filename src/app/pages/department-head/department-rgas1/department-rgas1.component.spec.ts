import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentRgas1Component } from './department-rgas1.component';

describe('DepartmentRgas1Component', () => {
  let component: DepartmentRgas1Component;
  let fixture: ComponentFixture<DepartmentRgas1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentRgas1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentRgas1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

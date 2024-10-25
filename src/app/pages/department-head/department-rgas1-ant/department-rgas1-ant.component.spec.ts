import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentRgas1AntComponent } from './department-rgas1-ant.component';

describe('DepartmentRgas1AntComponent', () => {
  let component: DepartmentRgas1AntComponent;
  let fixture: ComponentFixture<DepartmentRgas1AntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentRgas1AntComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentRgas1AntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

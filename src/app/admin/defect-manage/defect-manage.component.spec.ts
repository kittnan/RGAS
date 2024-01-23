import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectManageComponent } from './defect-manage.component';

describe('DefectManageComponent', () => {
  let component: DefectManageComponent;
  let fixture: ComponentFixture<DefectManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefectManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefectManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorRgas2Component } from './operator-rgas2.component';

describe('OperatorRgas2Component', () => {
  let component: OperatorRgas2Component;
  let fixture: ComponentFixture<OperatorRgas2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatorRgas2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperatorRgas2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

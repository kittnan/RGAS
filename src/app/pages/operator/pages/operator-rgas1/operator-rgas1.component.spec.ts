import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorRgas1Component } from './operator-rgas1.component';

describe('OperatorRgas1Component', () => {
  let component: OperatorRgas1Component;
  let fixture: ComponentFixture<OperatorRgas1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatorRgas1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperatorRgas1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerRgas1Component } from './engineer-rgas1.component';

describe('EngineerRgas1Component', () => {
  let component: EngineerRgas1Component;
  let fixture: ComponentFixture<EngineerRgas1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineerRgas1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineerRgas1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

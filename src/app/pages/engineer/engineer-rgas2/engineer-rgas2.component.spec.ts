import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerRgas2Component } from './engineer-rgas2.component';

describe('EngineerRgas2Component', () => {
  let component: EngineerRgas2Component;
  let fixture: ComponentFixture<EngineerRgas2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineerRgas2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineerRgas2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

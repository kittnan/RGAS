import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerEstimateShipment2Component } from './engineer-estimate-shipment2.component';

describe('EngineerEstimateShipment2Component', () => {
  let component: EngineerEstimateShipment2Component;
  let fixture: ComponentFixture<EngineerEstimateShipment2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineerEstimateShipment2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineerEstimateShipment2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

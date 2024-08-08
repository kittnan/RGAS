import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerEstimateShipmentComponent } from './engineer-estimate-shipment.component';

describe('EngineerEstimateShipmentComponent', () => {
  let component: EngineerEstimateShipmentComponent;
  let fixture: ComponentFixture<EngineerEstimateShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineerEstimateShipmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineerEstimateShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

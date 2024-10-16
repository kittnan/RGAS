import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEngineerEstimateShipment2Component } from './dialog-engineer-estimate-shipment2.component';

describe('DialogEngineerEstimateShipment2Component', () => {
  let component: DialogEngineerEstimateShipment2Component;
  let fixture: ComponentFixture<DialogEngineerEstimateShipment2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEngineerEstimateShipment2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEngineerEstimateShipment2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

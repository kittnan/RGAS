import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerDeliveryComponent } from './engineer-delivery.component';

describe('EngineerDeliveryComponent', () => {
  let component: EngineerDeliveryComponent;
  let fixture: ComponentFixture<EngineerDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineerDeliveryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineerDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerDeliveryViewComponent } from './engineer-delivery-view.component';

describe('EngineerDeliveryViewComponent', () => {
  let component: EngineerDeliveryViewComponent;
  let fixture: ComponentFixture<EngineerDeliveryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineerDeliveryViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineerDeliveryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

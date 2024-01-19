import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RgasComponent } from './rgas.component';

describe('RgasComponent', () => {
  let component: RgasComponent;
  let fixture: ComponentFixture<RgasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RgasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RgasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

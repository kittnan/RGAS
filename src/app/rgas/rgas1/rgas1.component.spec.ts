import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rgas1Component } from './rgas1.component';

describe('Rgas1Component', () => {
  let component: Rgas1Component;
  let fixture: ComponentFixture<Rgas1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Rgas1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rgas1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

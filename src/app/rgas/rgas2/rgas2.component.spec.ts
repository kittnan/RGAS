import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rgas2Component } from './rgas2.component';

describe('Rgas2Component', () => {
  let component: Rgas2Component;
  let fixture: ComponentFixture<Rgas2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Rgas2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rgas2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

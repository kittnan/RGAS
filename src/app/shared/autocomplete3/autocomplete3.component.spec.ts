import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Autocomplete3Component } from './autocomplete3.component';

describe('Autocomplete3Component', () => {
  let component: Autocomplete3Component;
  let fixture: ComponentFixture<Autocomplete3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Autocomplete3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Autocomplete3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

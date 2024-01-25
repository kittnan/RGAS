import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form1MultipleComponent } from './form1-multiple.component';

describe('Form1MultipleComponent', () => {
  let component: Form1MultipleComponent;
  let fixture: ComponentFixture<Form1MultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Form1MultipleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Form1MultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

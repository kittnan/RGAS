import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form1ViewComponent } from './form1-view.component';

describe('Form1ViewComponent', () => {
  let component: Form1ViewComponent;
  let fixture: ComponentFixture<Form1ViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Form1ViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Form1ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

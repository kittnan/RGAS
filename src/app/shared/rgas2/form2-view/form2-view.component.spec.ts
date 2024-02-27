import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form2ViewComponent } from './form2-view.component';

describe('Form2ViewComponent', () => {
  let component: Form2ViewComponent;
  let fixture: ComponentFixture<Form2ViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Form2ViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Form2ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

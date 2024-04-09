import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form4ViewComponent } from './form4-view.component';

describe('Form4ViewComponent', () => {
  let component: Form4ViewComponent;
  let fixture: ComponentFixture<Form4ViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Form4ViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Form4ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

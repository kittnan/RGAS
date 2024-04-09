import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form3ViewComponent } from './form3-view.component';

describe('Form3ViewComponent', () => {
  let component: Form3ViewComponent;
  let fixture: ComponentFixture<Form3ViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Form3ViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Form3ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

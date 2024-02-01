import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form3MenuComponent } from './form3-menu.component';

describe('Form3MenuComponent', () => {
  let component: Form3MenuComponent;
  let fixture: ComponentFixture<Form3MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Form3MenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Form3MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

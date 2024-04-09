import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form1EngineerComponent } from './form1-engineer.component';

describe('Form1EngineerComponent', () => {
  let component: Form1EngineerComponent;
  let fixture: ComponentFixture<Form1EngineerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Form1EngineerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Form1EngineerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

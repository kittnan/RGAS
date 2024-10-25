import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpreterRgas1AntComponent } from './interpreter-rgas1-ant.component';

describe('InterpreterRgas1AntComponent', () => {
  let component: InterpreterRgas1AntComponent;
  let fixture: ComponentFixture<InterpreterRgas1AntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterpreterRgas1AntComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterpreterRgas1AntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

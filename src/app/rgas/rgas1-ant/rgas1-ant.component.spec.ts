import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rgas1AntComponent } from './rgas1-ant.component';

describe('Rgas1AntComponent', () => {
  let component: Rgas1AntComponent;
  let fixture: ComponentFixture<Rgas1AntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Rgas1AntComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rgas1AntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

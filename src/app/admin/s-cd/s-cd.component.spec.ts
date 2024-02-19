import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SCdComponent } from './s-cd.component';

describe('SCdComponent', () => {
  let component: SCdComponent;
  let fixture: ComponentFixture<SCdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SCdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SCdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

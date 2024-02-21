import { ComponentFixture, TestBed } from '@angular/core/testing';

import { M1eComponent } from './m1e.component';

describe('M1eComponent', () => {
  let component: M1eComponent;
  let fixture: ComponentFixture<M1eComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ M1eComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(M1eComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DCdComponent } from './d-cd.component';

describe('DCdComponent', () => {
  let component: DCdComponent;
  let fixture: ComponentFixture<DCdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DCdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DCdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

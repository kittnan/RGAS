import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Skeleton1Component } from './skeleton1.component';

describe('Skeleton1Component', () => {
  let component: Skeleton1Component;
  let fixture: ComponentFixture<Skeleton1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Skeleton1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Skeleton1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

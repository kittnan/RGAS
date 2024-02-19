import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LCdComponent } from './l-cd.component';

describe('LCdComponent', () => {
  let component: LCdComponent;
  let fixture: ComponentFixture<LCdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LCdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LCdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionRgas1Component } from './section-rgas1.component';

describe('SectionRgas1Component', () => {
  let component: SectionRgas1Component;
  let fixture: ComponentFixture<SectionRgas1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionRgas1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionRgas1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionRgas1AntComponent } from './section-rgas1-ant.component';

describe('SectionRgas1AntComponent', () => {
  let component: SectionRgas1AntComponent;
  let fixture: ComponentFixture<SectionRgas1AntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionRgas1AntComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionRgas1AntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManSectionSelectComponent } from './man-section-select.component';

describe('ManSectionSelectComponent', () => {
  let component: ManSectionSelectComponent;
  let fixture: ComponentFixture<ManSectionSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManSectionSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManSectionSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

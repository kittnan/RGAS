import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerRgasNewComponent } from './engineer-rgas-new.component';

describe('EngineerRgasNewComponent', () => {
  let component: EngineerRgasNewComponent;
  let fixture: ComponentFixture<EngineerRgasNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineerRgasNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineerRgasNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

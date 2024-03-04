import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorRgasNewComponent } from './operator-rgas-new.component';

describe('OperatorRgasNewComponent', () => {
  let component: OperatorRgasNewComponent;
  let fixture: ComponentFixture<OperatorRgasNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatorRgasNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperatorRgasNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

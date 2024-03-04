import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorRgasInformationComponent } from './operator-rgas-information.component';

describe('OperatorRgasInformationComponent', () => {
  let component: OperatorRgasInformationComponent;
  let fixture: ComponentFixture<OperatorRgasInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatorRgasInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperatorRgasInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

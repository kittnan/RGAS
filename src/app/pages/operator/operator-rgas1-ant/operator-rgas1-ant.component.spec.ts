import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorRgas1AntComponent } from './operator-rgas1-ant.component';

describe('OperatorRgas1AntComponent', () => {
  let component: OperatorRgas1AntComponent;
  let fixture: ComponentFixture<OperatorRgas1AntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatorRgas1AntComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperatorRgas1AntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

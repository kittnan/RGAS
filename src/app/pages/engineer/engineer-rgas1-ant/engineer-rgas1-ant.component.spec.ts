import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerRgas1AntComponent } from './engineer-rgas1-ant.component';

describe('EngineerRgas1AntComponent', () => {
  let component: EngineerRgas1AntComponent;
  let fixture: ComponentFixture<EngineerRgas1AntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineerRgas1AntComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineerRgas1AntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

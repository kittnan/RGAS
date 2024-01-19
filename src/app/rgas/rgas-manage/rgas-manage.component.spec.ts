import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RgasManageComponent } from './rgas-manage.component';

describe('RgasManageComponent', () => {
  let component: RgasManageComponent;
  let fixture: ComponentFixture<RgasManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RgasManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RgasManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

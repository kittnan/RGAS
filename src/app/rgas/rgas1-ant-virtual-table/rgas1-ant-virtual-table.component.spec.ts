import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rgas1AntVirtualTableComponent } from './rgas1-ant-virtual-table.component';

describe('Rgas1AntVirtualTableComponent', () => {
  let component: Rgas1AntVirtualTableComponent;
  let fixture: ComponentFixture<Rgas1AntVirtualTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Rgas1AntVirtualTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rgas1AntVirtualTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

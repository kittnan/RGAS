import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsManageComponent } from './models-manage.component';

describe('ModelsManageComponent', () => {
  let component: ModelsManageComponent;
  let fixture: ComponentFixture<ModelsManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelsManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelsManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

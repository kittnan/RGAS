import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsManageCommonComponent } from './models-manage-common.component';

describe('ModelsManageCommonComponent', () => {
  let component: ModelsManageCommonComponent;
  let fixture: ComponentFixture<ModelsManageCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelsManageCommonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelsManageCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesBottomComponent } from './files-bottom.component';

describe('FilesBottomComponent', () => {
  let component: FilesBottomComponent;
  let fixture: ComponentFixture<FilesBottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesBottomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilesBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RPrincipleComponent } from './r-principle.component';

describe('RPrincipleComponent', () => {
  let component: RPrincipleComponent;
  let fixture: ComponentFixture<RPrincipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RPrincipleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RPrincipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

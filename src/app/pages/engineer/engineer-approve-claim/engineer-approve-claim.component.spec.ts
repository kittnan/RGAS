import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerApproveClaimComponent } from './engineer-approve-claim.component';

describe('EngineerApproveClaimComponent', () => {
  let component: EngineerApproveClaimComponent;
  let fixture: ComponentFixture<EngineerApproveClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineerApproveClaimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineerApproveClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

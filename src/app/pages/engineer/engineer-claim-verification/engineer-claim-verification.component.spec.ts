import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerClaimVerificationComponent } from './engineer-claim-verification.component';

describe('EngineerClaimVerificationComponent', () => {
  let component: EngineerClaimVerificationComponent;
  let fixture: ComponentFixture<EngineerClaimVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineerClaimVerificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineerClaimVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

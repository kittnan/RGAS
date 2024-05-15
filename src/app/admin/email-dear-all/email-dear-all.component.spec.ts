import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailDearAllComponent } from './email-dear-all.component';

describe('EmailDearAllComponent', () => {
  let component: EmailDearAllComponent;
  let fixture: ComponentFixture<EmailDearAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailDearAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailDearAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

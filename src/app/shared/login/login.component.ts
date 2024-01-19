import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { AuthService } from 'src/app/auth/auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    fadeInOnEnterAnimation({ delay: 500 }),
  ]
})
export class LoginComponent implements OnInit {

  readonly loginForm = new FormGroup({
    username: new FormControl('', { validators: [Validators.required] }),
    password: new FormControl('', { validators: [Validators.required] }),
  })
  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  onSubmit() {
    try {
      const { username, password }: any = this.loginForm.value;
      console.log(this.loginForm.value);
      localStorage.setItem('RGAS_login','ok')
      this.router.navigate(['/users']).then(()=>location.reload())

    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

}

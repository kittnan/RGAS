import { HttpUsersService } from 'src/app/https/http-users.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { bounceInAnimation, fadeInOnEnterAnimation, flipAnimation, flipOutXAnimation } from 'angular-animations';
import { AuthService } from 'src/app/auth/auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { lastValueFrom } from 'rxjs';
import { LocalStoreService } from 'src/app/services/local-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    flipOutXAnimation({ delay: 1000, duration: 200 }),
  ]
})
export class LoginComponent implements OnInit {

  readonly loginForm = new FormGroup({
    username: new FormControl('', { validators: [Validators.required] }),
    password: new FormControl('', { validators: [Validators.required] }),
  })
  userLogin: any
  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private $user: HttpUsersService,
    private $local: LocalStoreService
  ) { }

  ngOnInit(): void {
    let localUser: any = localStorage.getItem('RGAS_user')
    this.userLogin = JSON.parse(localUser)

  }
  onSubmit() {
    try {
      const { username, password }: any = this.loginForm.value;
      console.log(this.loginForm.value);
      // this.router.navigate(['/admin']).then(() => location.reload())
      this.onLogin(username, password)
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
  async onLogin(username: any, password: any) {
    try {
      const userLogin = await lastValueFrom(this.$user.login({
        username: username,
        password: password
      }))
      if (userLogin && userLogin.length > 0) {
        localStorage.setItem('RGAS_user', JSON.stringify(userLogin[0]))
        this.userLogin = userLogin[0]
        if (userLogin && userLogin.access && userLogin.access.length === 1) {
          this.goLink(userLogin.access[0])
        }
      }
      // localStorage.setItem('RGAS_login', 'ok')

      console.log("🚀 ~ userLogin:", userLogin)
    } catch (error) {
      console.log("🚀 ~ error:", error)

    }
  }

  goLink(access: string) {
    console.log("🚀 ~ access:", access)
    localStorage.setItem("RGAS_auth", access)
    switch (access) {
      case 'admin':
        this.$local.saveLocalStore('RGAS_auth', access)
        this.router.navigate(['admin']).then(() => location.reload())
        break;
      case 'operator':
        this.$local.saveLocalStore('RGAS_auth', access)
        this.router.navigate(['operator']).then(() => location.reload())
        break;
      case 'engineer':
        this.$local.saveLocalStore('RGAS_auth', access)
        this.router.navigate(['engineer']).then(() => location.reload())
        break;
      case 'sectionHead':
        this.$local.saveLocalStore('RGAS_auth', access)
        this.router.navigate(['sectionHead']).then(() => location.reload())
        break;
      case 'interpreter':
        this.$local.saveLocalStore('RGAS_auth', access)
        this.router.navigate(['interpreter']).then(() => location.reload())
        break;
      case 'departmentHead':
        this.$local.saveLocalStore('RGAS_auth', access)
        this.router.navigate(['departmentHead']).then(() => location.reload())
        break;
      case 'logout':
        localStorage.removeItem('RGAS_user')
        break;

      default:
        break;
    }
  }


  loginStatus() {
    if (localStorage.getItem('RGAS_user')) {
      return true
    } else {
      return false
    }
  }


}

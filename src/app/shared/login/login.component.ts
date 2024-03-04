import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInOnEnterAnimation, flipOutXAnimation } from 'angular-animations';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { HttpUsersService } from 'src/app/https/http-users.service';
import { LocalStoreService } from 'src/app/services/local-store.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

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
  showText: boolean = false
  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private $user: HttpUsersService,
    private $local: LocalStoreService,
    private $loader: NgxUiLoaderService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.userLogin = this.$local.getProfile()
    if (this.$local.getAuth()) {
      this.goLink(this.$local.getAuth())
    }

    setTimeout(() => {
      let el: any = document.getElementById('username')?.focus()
    }, 1000);
  }
  onSubmit() {
    try {
      const { username, password }: any = this.loginForm.value;
      this.onLogin(username, password)
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
  async onLogin(username: any, password: any) {
    try {
      const auth: any = await lastValueFrom(this.http.post(`${environment.API}/auth/login`, {
        username: username,
        password: password
      }))
      console.log("🚀 ~ auth:", auth)
      if (auth) {
        this.$local.setToken(auth.access_token)
        this.$local.setRefreshToken(auth.refresh_token)
        this.userLogin = auth.profile
        let profiles = {
          ...auth.profile,
          ...auth.adAcc
        }
        console.log("🚀 ~ profiles:", profiles)
        this.$local.setProfile(profiles)
        if (profiles && profiles.access && profiles.access.length === 1) {
          this.goLink(profiles.access[0])
        }
      } else {
        this.showText = true
      }
    } catch (error) {
      console.log("🚀 ~ error:", error)
      alert('')
    }
  }
  // async onLogin(username: any, password: any) {
  //   try {
  //     const userLogin = await lastValueFrom(this.$user.login({
  //       username: username,
  //       password: password
  //     }))
  //     if (userLogin && userLogin.length > 0) {
  //       this.$local.setProfile(userLogin[0])
  //       this.userLogin = userLogin[0]
  //       if (userLogin && userLogin.access && userLogin.access.length === 1) {
  //         this.goLink(userLogin.access[0])
  //       }
  //     } else {
  //       this.showText = true
  //     }
  //   } catch (error) {
  //     console.log("🚀 ~ error:", error)
  //     alert('')
  //   }
  // }

  goLink(access: any) {
    this.$loader.start()
    this.$local.setAuth(access)
    switch (access) {
      case 'admin':
        this.$local.setAuth(access)
        this.router.navigate(['admin']).then(() => location.reload())
        break;
      case 'operator':
        this.$local.setAuth(access)
        this.router.navigate(['operator']).then(() => location.reload())
        break;
      case 'engineer':
        this.$local.setAuth(access)
        this.router.navigate(['engineer']).then(() => location.reload())
        break;
      case 'sectionHead':
        this.$local.setAuth(access)
        this.router.navigate(['sectionHead']).then(() => location.reload())
        break;
      case 'interpreter':
        this.$local.setAuth(access)
        this.router.navigate(['interpreter']).then(() => location.reload())
        break;
      case 'departmentHead':
        this.$local.setAuth(access)
        this.router.navigate(['departmentHead']).then(() => location.reload())
        break;
      case 'logout':
        this.$local.removeLocalStore('RGAS_profile')
        this.$local.removeLocalStore('RGAS_auth')
        this.$local.removeLocalStore('RGAS_access_token')
        this.$local.removeLocalStore('RGAS_refresh_token')
        this.router.navigate(['']).then(() => location.reload())
        break;

      default:
        break;
    }
  }


  loginStatus() {
    if (this.$local.getProfile() && !this.$local.getAuth()) {
      return true
    } else {
      return false
    }
  }


}

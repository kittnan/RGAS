import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { LocalStoreService } from './services/local-store.service';

interface SideItem {
  title: string,
  icon: string,
  path: string,
  roles?: string[]
  items?: SideItem[]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RGAS';
  titleLong = 'Return goods authorization system ';
  theme = false;

  @HostListener('document:mouseenter', ['$event'])
  onHover(event: MouseEvent) {
    document.title = this.title;
  }

  @HostListener('document:mouseleave', ['$event'])
  onLeave(event: MouseEvent) {
    document.title = this.titleLong;
  }

  mobileQuery!: MediaQueryList;

  fillerNav: SideItem[] = [
    {
      title: 'Users',
      icon: 'groups',
      path: '',
      roles: ['admin'],
      items: [
        {
          title: 'Manage',
          icon: 'keyboard_arrow_right',
          path: 'admin/users-manage',
          roles: ['admin']
        },

      ]
    },
    {
      title: 'Masters',
      icon: 'category',
      path: '',
      roles: ['admin'],
      items: [
        {
          title: 'options',
          icon: 'keyboard_arrow_right',
          path: 'admin/masters',
          roles: ['admin']
        },
        {
          title: 'models',
          icon: 'keyboard_arrow_right',
          path: 'admin/models-manage',
          roles: ['admin']
        },
        {
          title: 'defects',
          icon: 'keyboard_arrow_right',
          path: 'admin/defect-manage',
          roles: ['admin']
        },
        {
          title: 'd-cd',
          icon: 'keyboard_arrow_right',
          path: 'admin/d-cd',
          roles: ['admin']
        },
        {
          title: 'l-cd',
          icon: 'keyboard_arrow_right',
          path: 'admin/l-cd',
          roles: ['admin']
        },
        {
          title: 's-cd',
          icon: 'keyboard_arrow_right',
          path: 'admin/s-cd',
          roles: ['admin']
        },
        {
          title: 'm1e',
          icon: 'keyboard_arrow_right',
          path: 'admin/m1e',
          roles: ['admin']
        },
        {
          title: 'r-principle',
          icon: 'keyboard_arrow_right',
          path: 'admin/r-principle',
          roles: ['admin']
        },
        {
          title: 'flow',
          icon: 'keyboard_arrow_right',
          path: 'admin/flow-report',
          roles: ['admin']
        },
      ]
    },
    {
      title: 'RGAS',
      icon: 'library_books',
      path: '',
      roles: ['admin', 'operator', 'engineer', 'sectionHead', 'interpreter', 'departmentHead'],
      items: [
        {
          title: 'RGAS-1',
          icon: 'keyboard_arrow_right',
          path: 'operator/rgas1',
          roles: ['admin', 'operator'],
        },
        {
          title: 'RGAS-1',
          icon: 'keyboard_arrow_right',
          path: 'engineer/rgas1',
          roles: ['admin', 'engineer']
        },
        {
          title: 'RGAS-1',
          icon: 'keyboard_arrow_right',
          path: 'sectionHead/rgas1',
          roles: ['admin', 'sectionHead']
        },
        {
          title: 'RGAS-1',
          icon: 'keyboard_arrow_right',
          path: 'interpreter/rgas1',
          roles: ['admin', 'interpreter']
        },
        {
          title: 'RGAS-1',
          icon: 'keyboard_arrow_right',
          path: 'departmentHead/rgas1',
          roles: ['admin', 'departmentHead']
        },


      ]
    },

  ]

  login: boolean = false
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private router: Router,
    private $local: LocalStoreService,
    private $loader: NgxUiLoaderService,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    let dark: boolean = this.$local.getDarkTheme() == 'true' ? true : false
    this.theme = dark
    this.setTheme(dark)
  }

  ngOnInit(): void {
    if (this.$local.getProfile() && this.$local.getAuth()) {
      this.login = true
    } else {
      this.login = false
      this.router.navigate(['/login'])
    }
  }


  toggleTheme() {
    this.theme = !this.theme;
    this.$local.setDarkTheme(this.theme)
    this.setTheme(this.theme);
  }
  private setTheme(darkTheme: boolean) {
    const lightClass = 'theme--light';
    const darkClass = 'theme--dark';
    const removeClass = darkTheme ? lightClass : darkClass;
    const addClass = darkTheme ? darkClass : lightClass;
    document.body.classList.remove(removeClass);
    document.body.classList.add(addClass);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  onLogout() {
    this.$loader.start()
    this.$local.removeLocalStore('RGAS_profile')
    this.$local.removeLocalStore('RGAS_auth')
    this.$local.removeLocalStore('RGAS_access_token')
    this.$local.removeLocalStore('RGAS_refresh_token')
    setTimeout(() => {
      this.router.navigate(['/login']).then(() => location.reload())
    }, 300);
  }

  // todo show user login name
  displayName() {
    let userLogin: any = this.$local.getProfile()
    if (userLogin) {
      return userLogin.name
    }
    return ''
  }
  // todo show user login name
  displayAuth() {
    let auth = this.$local.getAuth()
    if (auth) return `(${auth})`
    return ''
  }

  onClickName() {
    this.$local.removeLocalStore('RGAS_auth')
    this.router.navigate(['/']).then(() => location.reload())
  }

  // todo condition show side menu
  displaySideMenu(roles: any) {
    if (roles) {
      if (roles.includes(this.$local.getAuth())) return true
    }
    return false
  }
}

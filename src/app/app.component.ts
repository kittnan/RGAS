import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStoreService } from './services/local-store.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
interface SideItem {
  title: string,
  icon: string,
  path: string,
  items: SideItem[]
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RGAS';
  theme = false;

  mobileQuery!: MediaQueryList;

  fillerNav: SideItem[] = [
    {
      title: 'Users',
      icon: 'groups',
      path: '',
      items: [
        {
          title: 'Manage',
          icon: 'keyboard_arrow_right',
          path: 'admin/users-manage',
          items: []
        },

      ]
    },
    // {
    //   title: 'Model',
    //   icon: 'layers',
    //   path: '',
    //   items: [
    //     {
    //       title: 'Manage',
    //       icon: 'keyboard_arrow_right',
    //       path: 'admin/models-manage',
    //       items: []
    //     },

    //   ]
    // },
    // {
    //   title: 'Defect',
    //   icon: 'center_focus_strong',
    //   path: '',
    //   items: [
    //     {
    //       title: 'Defect',
    //       icon: 'keyboard_arrow_right',
    //       path: 'admin/defect-manage',
    //       items: []
    //     },

    //   ]
    // },
    {
      title: 'Masters',
      icon: 'category',
      path: '',
      items: [
        {
          title: 'options',
          icon: 'keyboard_arrow_right',
          path: 'admin/masters',
          items: []
        },
        {
          title: 'models',
          icon: 'keyboard_arrow_right',
          path: 'admin/models-manage',
          items: []
        },
        {
          title: 'defects',
          icon: 'keyboard_arrow_right',
          path: 'admin/defect-manage',
          items: []
        },
        {
          title: 'd-cd',
          icon: 'keyboard_arrow_right',
          path: 'admin/d-cd',
          items: []
        },
        {
          title: 'l-cd',
          icon: 'keyboard_arrow_right',
          path: 'admin/l-cd',
          items: []
        },
        {
          title: 's-cd',
          icon: 'keyboard_arrow_right',
          path: 'admin/s-cd',
          items: []
        },
        {
          title: 'm1e',
          icon: 'keyboard_arrow_right',
          path: 'admin/m1e',
          items: []
        },
        {
          title: 'r-principle',
          icon: 'keyboard_arrow_right',
          path: 'admin/r-principle',
          items: []
        },
        {
          title: 'flow',
          icon: 'keyboard_arrow_right',
          path: 'admin/flow-report',
          items: []
        },
      ]
    },
    {
      title: 'RGAS',
      icon: 'library_books',
      path: '',
      items: [
        {
          title: 'RGAS-1',
          icon: 'keyboard_arrow_right',
          path: 'operator/rgas1',
          items: []
        },
        {
          title: 'RGAS-1 - eng',
          icon: 'keyboard_arrow_right',
          path: 'engineer/rgas1',
          items: []
        },


      ]
    },

  ]

  login: boolean = false
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private router: Router,
    private $local: LocalStoreService,
    private $loader: NgxUiLoaderService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    let dark: boolean = this.$local.getDarkTheme() == 'true' ? true : false
    this.theme = dark
    this.setTheme(dark)
  }

  ngOnInit(): void {
    if (localStorage.getItem('RGAS_user')) {
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
    this.$local.removeAllLocalStore()
    this.router.navigate(['/login']).then(() => location.reload())
  }

  // todo show user login name
  displayName() {
    let userLogin: any = localStorage.getItem('RGAS_user')
    userLogin = userLogin ? JSON.parse(userLogin) : null
    if (userLogin) {
      let firstName = userLogin.firstName ? userLogin.firstName : ''
      let lastName = userLogin.lastName ? userLogin.lastName[0] : ''
      return `${firstName}-${lastName}`
    }
    return ''
  }
}

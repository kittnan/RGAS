import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStoreService } from './services/local-store.service';
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
          title: 'New',
          icon: 'person_add_alt',
          path: 'admin/users-new',
          items: []
        },
        {
          title: 'Manage',
          icon: 'manage_accounts',
          path: 'admin/users-manage',
          items: []
        },

      ]
    },
    {
      title: 'Model',
      icon: 'groups',
      path: '',
      items: [
        {
          title: 'Manage',
          icon: 'manage_accounts',
          path: 'admin/models-manage',
          items: []
        },

      ]
    },
    {
      title: 'Defect',
      icon: 'groups',
      path: '',
      items: [
        {
          title: 'Defect',
          icon: 'manage_accounts',
          path: 'admin/defect-manage',
          items: []
        },

      ]
    },
    {
      title: 'Masters',
      icon: 'groups',
      path: '',
      items: [
        {
          title: 'masters',
          icon: 'manage_accounts',
          path: 'admin/masters',
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
          icon: 'post_add',
          path: 'rgas/1',
          items: []
        },
        {
          title: 'RGAS-2',
          icon: 'assignment',
          path: 'rgas/2',
          items: []
        },
        {
          title: 'manage',
          icon: 'view_list',
          path: 'rgas/manage',
          items: []
        },

      ]
    },

  ]

  login: boolean = false
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private router: Router,
    private $local: LocalStoreService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
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
    this.$local.removeAllLocalStore()
    this.router.navigate(['/login']).then(() => location.reload())
  }

  // todo show user login nane
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

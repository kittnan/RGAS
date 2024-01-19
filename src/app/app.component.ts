import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';

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
          path: 'users/new',
          items: []
        },
        {
          title: 'Manage',
          icon: 'manage_accounts',
          path: 'users/manage',
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

  // fillerContent = Array.from(
  //   {length: 50},
  //   () =>
  //     `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
  //      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
  //      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
  //      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
  //      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  // );
  login: boolean = false
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    if (localStorage.getItem('RGAS_login') == 'ok') {
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
    localStorage.removeItem('RGAS_login')
    this.router.navigate(['/login']).then(() => location.reload())
  }
}

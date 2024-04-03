import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStoreService } from '../services/local-store.service';
import { AdminGuard } from './admin.guard';

@Injectable({
  providedIn: 'root'
})
export class InterpreterGuard implements CanActivate {
  constructor(
    private $local: LocalStoreService,
    private router: Router
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.$local.getAuth() == 'interpreter' || AdminGuard)
      return true;
      this.router.navigate(['login'])
    return false
  }

}

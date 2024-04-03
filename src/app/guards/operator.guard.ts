import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStoreService } from '../services/local-store.service';
import { AdminGuard } from './admin.guard';
import { EngineerGuard } from './engineer.guard';

@Injectable({
  providedIn: 'root'
})
export class OperatorGuard implements CanActivate {
  constructor(
    private $local: LocalStoreService,
    private router: Router
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.$local.getAuth() == 'operator' || AdminGuard || EngineerGuard)
      return true;
      this.router.navigate(['login'])
    return false
  }

}

import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStoreService } from '../services/local-store.service';
import { AdminGuard } from './admin.guard';
import { SectionGuard } from './section.guard';
import { DepartmentGuard } from './department.guard';

@Injectable({
  providedIn: 'root'
})
export class EngineerGuard implements CanActivate {
  constructor(
    private $local: LocalStoreService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.$local.getAuth() == 'engineer' || AdminGuard || SectionGuard || DepartmentGuard )
      return true;
    this.router.navigate(['login'])
    return false
  }

}

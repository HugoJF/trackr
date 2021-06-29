import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {PontomaisService} from "./pontomais.service";

@Injectable({
  providedIn: 'root'
})
export class PontomaisGuard implements CanActivate {
  constructor(private api: PontomaisService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.api.hasCredentials()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');

      return false;
    }
  }

}

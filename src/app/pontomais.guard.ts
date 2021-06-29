import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {PontomaisService} from "./pontomais.service";

@Injectable({
  providedIn: 'root'
})
export class PontomaisGuard implements CanActivate {
  constructor(private api: PontomaisService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.api.hasCredentials();
  }

}

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {CredentialsRepositoryService} from "./services/credentials-repository.service";

@Injectable({
  providedIn: 'root'
})
export class PontomaisGuard implements CanActivate {
  constructor(private credentials: CredentialsRepositoryService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.credentials.hasCredentials()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');

      return false;
    }
  }

}

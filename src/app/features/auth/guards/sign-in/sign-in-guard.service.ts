import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthModel } from '../../models/auth.model';
import { selectAuthToken } from '../../ngrx/selectors';
import { map } from 'rxjs/operators';

@Injectable()
export class SignInGuardService implements CanActivate, CanLoad {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.isAuthenticated(true);
  }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.isAuthenticated(false) as Observable<boolean>;
  }
  isAuthenticated(canActivate: boolean) {
    return this.store.select(selectAuthToken)
      .pipe(
        map(authToken => {
          if (authToken) {
            return true;
          } else {
            return canActivate ? this.router.createUrlTree(['/']) : false;
          }
        })
      )
  }
  constructor(private store: Store<AuthModel>, private router: Router) { }
}

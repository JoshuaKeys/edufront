import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { map, take } from 'rxjs/operators';
import { AuthStateModel } from 'src/app/features/auth/models/auth-state.model';
import { selectAuthToken } from 'src/app/features/auth/ngrx/selectors';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.store.select(selectAuthToken).pipe(
      map(authToken => {
        return authToken ? true : this.router.createUrlTree(['/sign-in'])
      })
    )
  }
  canLoad(route: Route, segments: UrlSegment[]): boolean {
    console.log('*********')
    // return this.store.select(selectAuthToken).pipe(
    //   take(1),
    //   map(authToken => {

    //     return authToken ? true : false
    //   }),

    // )
    return false;
  }
  constructor(
    private store: Store<AuthStateModel>,
    private router: Router
  ) { }
}

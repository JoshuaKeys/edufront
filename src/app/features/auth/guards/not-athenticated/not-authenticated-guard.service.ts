import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthStateModel } from '../../models/auth-state.model';
import { selectAuthToken } from '../../ngrx/selectors';
import { map } from 'rxjs/operators';

@Injectable()
export class NotAuthenticatedGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.store.select(selectAuthToken).pipe(
      map(authToken => {
        return !authToken ? true : this.router.createUrlTree(['/'])
      })
    )
  }
  constructor(
    private store: Store<AuthStateModel>,
    private router: Router
  ) { }
}

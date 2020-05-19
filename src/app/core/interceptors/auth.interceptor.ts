import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { AppService } from 'src/app/services/app/app.service';
import { tap, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthStateModel } from 'src/app/features/auth/models/auth-state.model';
import { selectAuthToken } from 'src/app/features/auth/ngrx/selectors';

const AUTH_HEADER = 'Authorization';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private injector: Injector,
    private appService: AppService,
    private router: Router,
    private store: Store<AuthStateModel>,
    private authService: AuthService
  ) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with basic auth credentials if available
    let token = localStorage.getItem("token");
    debugger;
    // request = request.clone({
    //   setHeaders: {
    //     Authorization: `Bearer ${token}`
    //   }
    // });

    const newRequest = token
    ? request.clone({ setHeaders: { [AUTH_HEADER]: `Bearer ${token}` } })
    : request.clone();

    this.appService.setLoadingStatus(true);


    return next.handle(newRequest).pipe(
      tap(event => {

        if (event instanceof HttpResponse) {
          const response = event as HttpResponse<any>;

          if (response.status === 200) {
            this.appService.setLoadingStatus(false);
          }

          if (response.status === 401) {
            console.log('TODO: investigate this')
            this.authService.deleteSessionToken();
            this.router.navigate(['/sign-in']);
          }
        }
      })
    )
}
}

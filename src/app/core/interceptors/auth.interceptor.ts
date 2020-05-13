import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { AppService } from 'src/app/services/app/app.service';
import { tap } from 'rxjs/operators';

const AUTH_HEADER = 'Authorization';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private injector: Injector,
    private appService: AppService,
    private router: Router
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthService);
    const newRequest = authService.isLoggedIn
      ? request.clone({ setHeaders: { [AUTH_HEADER]: `Bearer ${authService.sessionToken}` } })
      : request.clone();

    if (newRequest.method === 'POST') {
      this.appService.setLoadingStatus(true);
    }
    return next.handle(newRequest).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          const response = event as HttpResponse<any>;

          if (response.status === 200) {
            this.appService.setLoadingStatus(false);
          }

          if (response.status === 401) {
            authService.deleteSessionToken();
            this.router.navigate(['/sign-in']);
          }
        }
      })
    )
  }
}

import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';
import { ConfigService } from './core/services/config/config.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthStateModel } from './features/auth/models/auth-state.model';
import { retrieveTokenRequest } from './features/auth/ngrx/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public constructor(private authService: AuthService,
    private el: ElementRef,
    private config: ConfigService,
    private store: Store<AuthStateModel>,
    private router: Router) {
  }

  ngOnInit() {
    this.setupAuth();
    this.setupTheme();
    this.store.dispatch(retrieveTokenRequest())
  }

  private setupAuth() {
    this.authService.initialize();
    if (this.authService.hasTokenExpired) {
      this.router.navigate(['sign-in'])
    } else {
      this.authService.setupTokenRefresh();
    }
  }

  private setupTheme() {
    this.el.nativeElement.classList.add(`theme-${this.config.get('SKIN')}`);
  }
}

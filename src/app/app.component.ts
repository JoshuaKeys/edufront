import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';
import { ConfigService } from './core/services/config/config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public constructor(private authService: AuthService,
    private el: ElementRef,
    private config: ConfigService,
    private router: Router) {
  }

  ngOnInit() {
    this.setupAuth();
    this.setupTheme();
  }

  private setupAuth() {
    this.authService.initialize();
    if (this.authService.hasTokenExpired) {
      this.authService.deleteSessionToken();
      // this.router.navigate(['sign-in'])
    } else {
      this.authService.setupTokenRefresh();
    }
  }

  private setupTheme() {
    this.el.nativeElement.classList.add(`theme-${this.config.get('SKIN')}`);
  }
}

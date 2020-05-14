import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserType } from 'src/app/core/auth.constants';
// import { UserType } from '@core/auth.constants';
// import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'sign-in',
  templateUrl: 'sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  constructor(private router: Router,
    private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.isLoggedIn) {

      return this.redirectUser();
    }
    // this.router.navigateByUrl('/admin/onboard');

    this.authService.login()
      .then(() => {
        if (this.authService.isLoggedIn) {
          return this.redirectUser();
        }
      });
  }
  private redirectUser() {
    const userType = this.authService.userType;

    let route: string;

    switch (userType) {
      case UserType.ADMIN:
        // route = '/admin/'; TODO: Change this later
        route = '/'
        break;
      case UserType.TEACHER:
        route = '/teacher/landing-page';
        break;
      case UserType.STUDENT:
        route = '/student';
        break;
    }

    return this.router.navigate([route]);
  }
}

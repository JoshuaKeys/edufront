import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInGuardService } from './features/auth/guards/sign-in/sign-in-guard.service';


const routes: Routes = [
  {
    path: 'sign-in', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
    canLoad: [SignInGuardService]
  },
  {
    path: 'school-profile',
    loadChildren: () => import('./features/school-profile/school-profile.module').then(m => m.SchoolProfileModule)
  },
  {
    path: '',
    redirectTo: 'school-profile',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

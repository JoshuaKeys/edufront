import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedGuard } from './guards/authenticated/authenticated-guard';

const routes: Routes = [
  
  
  {
    path: 'ui',
    loadChildren: () => import('./features/ui-test/ui-test.module').then(m => m.uiTestModule),
  },
  
  {
    path: 'registration',
    loadChildren: () => import('./features/register-and-login/register-and-login.module').then(m => m.RegisterAndLoginModule),
  },
 
  {
    path: 'school-profile',
    canLoad: [AuthenticatedGuard],
    loadChildren: () => import('./features/school-profile-v2/school-profile-v2.module').then(m => m.SchoolProfileV2Module),

  },
  {
    path: 'classes-and-groups',
    canLoad: [AuthenticatedGuard],
    loadChildren: () => import('./features/classes-and-groups/classes-and-groups.module').then(m => m.ClassesAndGroupsModule),
  }
  
  ,
  {
    path: 'subjects',
    canLoad: [AuthenticatedGuard],
    loadChildren: () => import('./features/subjects/subjects.module').then(m => m.SubjectsModule)
  },
  {
    path: '',
    redirectTo: '/school-profile',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

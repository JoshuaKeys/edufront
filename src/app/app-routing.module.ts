import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedGuard } from './guards/authenticated/authenticated-guard';

const routes: Routes = [
  {
    path: 'ui',

    loadChildren: () =>
      import('./features/ui-test/ui-test.module').then(m => m.uiTestModule)
  },

  {
    path: 'user-settings',
    loadChildren: () =>
      import('./features/user-settings/user-settings.module').then(
        m => m.UserSettingsModule
      )
  },

  {
    path: 'registration',
    loadChildren: () =>
      import('./features/register-and-login/register-and-login.module').then(
        m => m.RegisterAndLoginModule
      )
  },
  {
    path: 'school-profile',
    canLoad: [AuthenticatedGuard],
    loadChildren: () =>
      import('./features/school-profile/school-profile-v2.module').then(
        m => m.SchoolProfileV2Module
      )
  },
  {
    path: 'classes-and-groups',
    canLoad: [AuthenticatedGuard],
    loadChildren: () =>
      import('./features/classes-and-groups/classes-and-groups.module').then(
        m => m.ClassesAndGroupsModule
      )
  },
  {
    path: 'subjects',
    canLoad: [AuthenticatedGuard],
    loadChildren: () =>
      import('./features/subjects/subjects.module').then(m => m.SubjectsModule)
  },
  {
    path: 'staffs',
    canLoad: [AuthenticatedGuard],
    loadChildren: () =>
      import('./features/staffs/staffs.module').then(m => m.StaffsModule)
  },
  {
    path: 'students',
    canLoad: [AuthenticatedGuard],
    loadChildren: () =>
      import('./features/students/students.module').then(m => m.StudentsModule)
  },
  {
    path: 'dashboard',
    canLoad: [AuthenticatedGuard],
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        m => m.DashboardModule
      )
  },
  {
    path: 'sections',
    canLoad: [AuthenticatedGuard],
    loadChildren: () =>
      import('./features/sections/sections.module').then(m => m.SectionsModule)
  },
  {
    path: 'calendar',
    canLoad: [AuthenticatedGuard],
    loadChildren: () =>
      import('./features/calender/calender.module').then(m => m.CalenderModule)
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

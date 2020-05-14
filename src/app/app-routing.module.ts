import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedGuard } from './guards/authenticated/authenticated-guard';


const routes: Routes = [
  {
    path: 'school-profile',
    canLoad: [AuthenticatedGuard],
    loadChildren: () => import('./features/school-profile/school-profile.module').then(m => m.SchoolProfileModule),

  }, {
    path: 'classes-and-groups',
    canLoad: [AuthenticatedGuard],
    loadChildren: () => import('./features/classes-and-groups/classes-and-groups.module').then(m => m.ClassesAndGroupsModule),
    // loadChildren: './features/classes-and-groups/classes-and-groups.module'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

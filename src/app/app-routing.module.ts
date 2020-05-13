import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'school-profile',
    loadChildren: () => import('./features/school-profile/school-profile.module').then(m => m.SchoolProfileModule)
  }, {
    path: 'classes-and-groups',
    loadChildren: () => import('./features/classes-and-groups/classes-and-groups.module').then(m => m.ClassesAndGroupsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

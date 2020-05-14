import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesAndGroupsRoutingModule } from './classes-and-groups-routing.module';
import { ClassesAndGroupHeaderComponent } from './components/classes-and-group-header/classes-and-group-header.component';
import { ClassCardComponent } from './components/class-card/class-card.component';
import { SchoolClassesCardComponent } from './components/school-classes-card/school-classes-card.component';
import { StoreModule } from '@ngrx/store';
import { classesAndGroupsReducer } from './ngrx/reducers';
import { ReactiveFormsModule } from '@angular/forms';
import { CLASSES_AND_GROUPS } from './ngrx/selectors';
import { ClassesAndGroupComponent } from './containers/classes-and-group/classes-and-group.component';
import { ClassesAndGroupsShellComponent, NameGroupsComponent } from './containers';



@NgModule({
  declarations: [
    ClassesAndGroupHeaderComponent,
    ClassesAndGroupComponent,
    ClassCardComponent,
    SchoolClassesCardComponent,
    ClassesAndGroupsShellComponent,
    NameGroupsComponent
  ],
  imports: [
    CommonModule,
    ClassesAndGroupsRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(CLASSES_AND_GROUPS, classesAndGroupsReducer)
  ]
})
export class ClassesAndGroupsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesAndGroupsRoutingModule } from './classes-and-groups-routing.module';
import { ClassCardComponent } from './components/class-card/class-card.component';
import { SchoolClassesCardComponent } from './components/school-classes-card/school-classes-card.component';
import { StoreModule } from '@ngrx/store';
import { classesAndGroupsReducer } from './ngrx/reducers';
import { ReactiveFormsModule } from '@angular/forms';
import { CLASSES_AND_GROUPS } from './ngrx/selectors';
import { ClassesAndGroupComponent } from './containers/classes-and-group/classes-and-group.component';
import { ClassesAndGroupsShellComponent, NameGroupsComponent, ClassesInSchoolComponent } from './containers';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { ClassesAndGroupsEffects } from './ngrx/effects';
import { ClassesAndGroupsService } from './services/classes-and-groups.service';
import { AuthInterceptor } from 'src/app/core/interceptors/auth.interceptor';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateGroupsQuestionComponent } from './containers/create-groups-question/create-groups-question.component';
import { GroupBoxComponent } from './components/group-box/group-box.component';
import { DraggableClassComponent } from './components/draggable-class/draggable-class.component';
import { ConfirmationComponent } from './containers/confirmation/confirmation.component';


@NgModule({
  declarations: [
    ClassesAndGroupComponent,
    ClassCardComponent,
    SchoolClassesCardComponent,
    ClassesAndGroupsShellComponent,
    NameGroupsComponent,
    ClassesInSchoolComponent,
    CreateGroupsQuestionComponent,
    GroupBoxComponent,
    DraggableClassComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    ClassesAndGroupsRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forFeature(CLASSES_AND_GROUPS, classesAndGroupsReducer),
    EffectsModule.forFeature([ClassesAndGroupsEffects])
  ],
  providers: [
    ClassesAndGroupsService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
})
export class ClassesAndGroupsModule { }

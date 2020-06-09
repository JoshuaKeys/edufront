import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesAndGroupsRoutingModule } from './classes-and-groups-routing.module';
import { ClassCardComponent } from './components/class-card/class-card.component';
import { SchoolClassesCardComponent } from './components/school-classes-card/school-classes-card.component';
import { StoreModule } from '@ngrx/store';
import { classesAndGroupsReducer } from './ngrx/reducers';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CLASSES_AND_GROUPS } from './ngrx/selectors';
import { ClassesAndGroupComponent } from './containers/classes-and-group/classes-and-group.component';
import {
  ClassesAndGroupsShellComponent,
  NameGroupsComponent,
  ClassesInSchoolComponent
} from './containers';
import { EffectsModule } from '@ngrx/effects';
import { ClassesAndGroupsEffects } from './ngrx/effects';
import { ClassesAndGroupsService } from './services/classes-and-groups.service';
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
    FormsModule,
    SharedModule,
    StoreModule.forFeature(CLASSES_AND_GROUPS, classesAndGroupsReducer),
    EffectsModule.forFeature([ClassesAndGroupsEffects])
  ],
  providers: [ClassesAndGroupsService]
})
export class ClassesAndGroupsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimetableComponent } from './component/timetable/timetable.component';
import { LayoutComponent } from './containers/layout/layout.component';
import { TimetableRoutingModule } from './timetable-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TimetableOptionsComponent } from './component/options/options.component';
import { SearchComponent } from './component/search/search.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'src/app/shared/components/generic-dialog/dialog.module';
import { SubjectIconFieldComponent } from './component/subject-icon-field/subject-icon-field.component';
import { SubjectsFormComponent } from './component/subjects-form/subjects-form.component';
import { ArrayInputFieldComponent } from './component/input-field/input-field.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { timetableReducer } from './ngrx/reducer';
import { TimetableEffects } from './ngrx/effects';
import { SimpleButtonComponent } from './component/simple-button/simple-button.component';
import { SubjectFormDialogComponent } from './component/subject-form-dialog/subject-form-dialog.component';

@NgModule({
  declarations: [
    TimetableComponent,
    LayoutComponent,
    TimetableOptionsComponent,
    SearchComponent,
    SubjectIconFieldComponent,
    SubjectsFormComponent,
    ArrayInputFieldComponent,
    SimpleButtonComponent,
    SubjectFormDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    TimetableRoutingModule,
    DragDropModule,
    DialogModule,
    StoreModule.forFeature('timetable', timetableReducer),
    EffectsModule.forFeature([TimetableEffects])
  ]
})
export class TimetableModule {}

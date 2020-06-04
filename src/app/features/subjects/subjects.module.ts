import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectsTaughtQuestionComponent } from './containers/subjects-taught-question/subjects-taught-question.component';
import { SubjectsShellComponent } from './containers/subjects-shell/subjects-shell.component';
import { SubjectsFormComponent } from './components/subjects-form/subjects-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SubjectsRoutingModule } from './subjects-routing.module';
import { SubjectIconFieldComponent } from './components/subject-icon-field/subject-icon-field.component';
import { IconPopupComponent } from './components/icon-popup/icon-popup.component';
import { StoreModule } from '@ngrx/store';
import { subjectsReducer } from './ngrx/reducers'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/core/interceptors/auth.interceptor';
import { SubjectResolver } from './resolvers/subject.resolver';
import { EffectsModule } from '@ngrx/effects';
import { SubjectsEffects } from './ngrx/effects';
import { SubjectsListComponent } from './components/subjects-list/subjects-list.component';
import { AssignSubjectsQuestionComponent, ConfirmationComponent } from './containers';
import { OptionsComponent } from './components/options/options.component';
import { SubjectsBoxComponent } from './components/subjects-box/subjects-box.component';
import { SubjectSummaryBoxComponent } from './components/subject-summary-box/subject-summary-box.component';
import { AddSubjectModalComponent } from './components/add-subject-modal/add-subject-modal.component';
import { ArrayInputFieldComponent } from './components/input-field/input-field.component';


@NgModule({
  declarations: [
    SubjectsShellComponent,
    SubjectsTaughtQuestionComponent,
    SubjectsFormComponent,
    SubjectIconFieldComponent,
    IconPopupComponent,
    SubjectsListComponent,
    AssignSubjectsQuestionComponent,
    ArrayInputFieldComponent,
    OptionsComponent,
    SubjectsBoxComponent,
    ConfirmationComponent,
    SubjectSummaryBoxComponent,
    AddSubjectModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    SubjectsRoutingModule,
    HttpClientModule,
    StoreModule.forFeature('subjects', subjectsReducer),
    EffectsModule.forFeature([SubjectsEffects])
  ],
  providers: [
    SubjectResolver,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
})
export class SubjectsModule { }

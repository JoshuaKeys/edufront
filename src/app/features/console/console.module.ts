import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConsoleRoutingModule } from './console-routing.module';
import { ConsoleClassesAndGroupsComponent } from './containers';
import { StoreModule } from '@ngrx/store';
import { consoleReducer } from './ngrx/reducers';
import { ClassesShellComponent } from './containers/classes-shell/classes-shell.component';
import { ConsoleSectionsComponent } from './containers/console-sections/console-sections.component';
import { ConsoleSubjectsComponent } from './containers/console-subjects/console-subjects.component';
import { ConsoleClassesService } from './services/console-classes/console-classes.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { ConsoleClassesEffects } from './ngrx/effects/console-classes/console-classes-groups.effects';

import { AuthInterceptor } from 'src/app/core/interceptors/auth.interceptor';
import { DeleteClassesModalComponent } from './components/delete-classes-modal/delete-classes-modal.component';
import { ConsoleSectionEditComponent } from './containers/console-section-edit/console-section-edit.component';
import { ConsoleSectionViewComponent } from './containers/console-section-view/console-section-view.component';
import { SectionsDropboxComponent } from './components/sections-dropbox/sections-dropbox.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConsoleSectionAsideComponent } from './components/console-section-aside/console-section-aside.component';
import { ConsoleComponentsModule } from './components/console-components.module';

@NgModule({
  declarations: [
    ClassesShellComponent,
    ConsoleClassesAndGroupsComponent,
    ConsoleSectionsComponent,
    ConsoleSubjectsComponent,
    DeleteClassesModalComponent,
    ConsoleSectionEditComponent,
    ConsoleSectionViewComponent,
    SectionsDropboxComponent,
    ConsoleSectionAsideComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    ConsoleRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('console', consoleReducer),
    EffectsModule.forFeature([ConsoleClassesEffects]),
    ConsoleComponentsModule
  ],
  providers: [
    ConsoleClassesService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class ConsoleModule { }

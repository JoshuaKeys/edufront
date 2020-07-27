import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsoleShellComponent } from './containers/console-shell/console-shell.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConsoleRoutingModule } from './console-routing.module';
import { ConsoleHeaderComponent } from './components/console-header/console-header.component';
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



@NgModule({
  declarations: [
    ConsoleShellComponent,
    ConsoleHeaderComponent,
    ClassesShellComponent,
    ConsoleClassesAndGroupsComponent,
    ConsoleSectionsComponent,
    ConsoleSubjectsComponent,
    DeleteClassesModalComponent,
    ConsoleSectionEditComponent,
    ConsoleSectionViewComponent,
    SectionsDropboxComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    ConsoleRoutingModule,
    StoreModule.forFeature('console', consoleReducer),
    EffectsModule.forFeature([ConsoleClassesEffects]),
  ],
  providers: [
    ConsoleClassesService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class ConsoleModule { }

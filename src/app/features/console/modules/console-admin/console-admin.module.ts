import { NgModule } from '@angular/core';
import { ClassesShellComponent } from './containers/classes-shell/classes-shell.component';
import { ConsoleClassesAndGroupsComponent, ConsoleShellComponent } from './containers';
import { ConsoleSectionEditComponent } from './containers/console-section-edit/console-section-edit.component';
import { ConsoleSectionViewComponent } from './containers/console-section-view/console-section-view.component';
import { ConsoleSectionsComponent } from './containers/console-sections/console-sections.component';
import { ConsoleSubjectsComponent } from './containers/console-subjects/console-subjects.component';
import { ConsoleHeaderComponent } from './components/console-header/console-header.component';
import { ConsoleSectionAsideComponent } from './components/console-section-aside/console-section-aside.component';
import { DeleteClassesModalComponent } from './components/delete-classes-modal/delete-classes-modal.component';
import { SectionsDropboxComponent } from './components/sections-dropbox/sections-dropbox.component';
import { SectionsSubjectsBoxComponent } from './components/sections-subjects-box/sections-subjects-box.component';
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { ConsoleAdminRoutingModule } from './console-admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { consoleReducer } from './ngrx/reducers';
import { ConsoleClassesEffects } from './ngrx/effects/console-classes/console-classes-groups.effects';
import { CommonModule } from '@angular/common';
import { ConsoleClassesService } from './services/console-classes/console-classes.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/core/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    ClassesShellComponent,
    ConsoleClassesAndGroupsComponent,
    ConsoleSectionEditComponent,
    ConsoleSectionViewComponent,
    ConsoleSectionsComponent,
    ConsoleShellComponent,
    ConsoleSubjectsComponent,
    ConsoleHeaderComponent,
    ConsoleSectionAsideComponent,
    DeleteClassesModalComponent,
    SectionsDropboxComponent,
    SectionsSubjectsBoxComponent,
    SidePanelComponent
  ],
  imports: [
    CommonModule,
    ConsoleAdminRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forFeature('console', consoleReducer),
    EffectsModule.forFeature([ConsoleClassesEffects]),
  ],
  exports: [
    ClassesShellComponent,
    ConsoleClassesAndGroupsComponent,
    ConsoleSectionEditComponent,
    ConsoleSectionViewComponent,
    ConsoleSectionsComponent,
    ConsoleShellComponent,
    ConsoleSubjectsComponent,
    ConsoleHeaderComponent,
    ConsoleSectionAsideComponent,
    DeleteClassesModalComponent,
    SectionsDropboxComponent,
    SectionsSubjectsBoxComponent,
    SidePanelComponent
  ],
  providers: [
    ConsoleClassesService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class ConsoleAdminModule { }

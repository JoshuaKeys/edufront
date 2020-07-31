import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConsoleRoutingModule } from './console-routing.module';
import { ConsoleClassesService } from './services/console-classes/console-classes.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from 'src/app/core/interceptors/auth.interceptor';
import { DeleteClassesModalComponent } from './components/delete-classes-modal/delete-classes-modal.component';
import { SectionsDropboxComponent } from './components/sections-dropbox/sections-dropbox.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConsoleSectionAsideComponent } from './components/console-section-aside/console-section-aside.component';
import { ConsoleComponentsModule } from './components/console-components.module';

@NgModule({
  declarations: [
    DeleteClassesModalComponent,
    SectionsDropboxComponent,
    ConsoleSectionAsideComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    ConsoleRoutingModule,
    ReactiveFormsModule,
    ConsoleComponentsModule
  ],
  providers: [
    ConsoleClassesService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class ConsoleModule { }

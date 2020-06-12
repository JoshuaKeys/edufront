import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionsRoutingModule } from './sections-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateSectionsComponent, ConfirmationComponent } from './containers';
import { CreateSectionsShellComponent } from './containers/create-sections-shell/create-sections-shell.component';
import { StoreModule } from '@ngrx/store';
import { sectionsReducer } from './ngrx/reducers';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SectionsService } from './services/sections.service';
import { EffectsModule } from '@ngrx/effects';
import { ClassesEffects } from './ngrx/effects'
import { AuthInterceptor } from 'src/app/core/interceptors/auth.interceptor';
import { SectionDropBoxComponent } from './components/section-drop-box/section-drop-box.component';
import { SectionAsideComponent } from './components/section-aside/section-aside.component';
import { SectionsEffects } from './ngrx/effects/sections.effects';
import { StudentsService } from '../students/services/students.service';



@NgModule({
  declarations: [
    CreateSectionsComponent,
    SectionDropBoxComponent,
    CreateSectionsShellComponent,
    SectionAsideComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SectionsRoutingModule,
    HttpClientModule,
    EffectsModule.forFeature([ClassesEffects, SectionsEffects]),
    StoreModule.forFeature('sections', sectionsReducer)
  ],
  providers: [
    SectionsService,
    StudentsService,
    {
      provide: HTTP_INTERCEPTORS, multi: true, useClass: AuthInterceptor
    }
  ]
})
export class SectionsModule { }

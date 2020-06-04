import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionsRoutingModule } from './sections-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateSectionsComponent } from './containers';
import { CreateSectionsShellComponent } from './containers/create-sections-shell/create-sections-shell.component';
import { StoreModule } from '@ngrx/store';
import { sectionsReducer } from './ngrx/reducers';



@NgModule({
  declarations: [
    CreateSectionsComponent,
    CreateSectionsShellComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SectionsRoutingModule,
    StoreModule.forFeature('sections', sectionsReducer)
  ]
})
export class SectionsModule { }

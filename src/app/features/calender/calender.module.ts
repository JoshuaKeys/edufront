import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { calenderReducer } from './ngrx/reducers';
import { CalenderRoutingModule } from './calender-routing.module';
import { AcademicYearQuestionComponent, CalenderShellComponent } from './containers';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    AcademicYearQuestionComponent,
    CalenderShellComponent
  ],
  imports: [
    CommonModule,
    CalenderRoutingModule,
    SharedModule,
    StoreModule.forFeature('calender', calenderReducer)
  ]
})
export class CalenderModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimetableComponent } from './component/timetable/timetable.component';
import { LayoutComponent } from './containers/layout/layout.component';
import { TimetableRoutingModule } from './timetable-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TimetableOptionsComponent } from './component/options/options.component';
import { SearchComponent } from './component/search/search.component';

@NgModule({
  declarations: [
    TimetableComponent,
    LayoutComponent,
    TimetableOptionsComponent,
    SearchComponent
  ],
  imports: [CommonModule, SharedModule, TimetableRoutingModule]
})
export class TimetableModule {}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { CalendarStateModel } from './../../models/calender-state.model'
import * as calendarActions from '../../ngrx/actions';
import { Observable } from 'rxjs';
import { CalendarModalModel } from '../../models/calender-modal.model';
import * as calendarSelectors from '../../ngrx/selectors'
@Component({
  selector: 'edu-academic-year-question',
  templateUrl: './academic-year-question.component.html',
  styleUrls: ['./academic-year-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcademicYearQuestionComponent implements OnInit {
  calendarModalState: Observable<CalendarModalModel>;
  ngOnInit(): void {
    this.calendarModalState = this.store.select(calendarSelectors.selectCalendarModalState)
  }
  closeStartModal() {
    this.store.dispatch(calendarActions.toggleStartModal())
  }
  constructor(private store: Store<CalendarStateModel>) { }
}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { CalendarModel } from '../../models/calendar.model';
import { Store } from '@ngrx/store';
import { CalendarStateModel } from '../../models/calender-state.model';
import { selectCalendar } from '../../ngrx/selectors';
import { map, pluck, tap } from 'rxjs/operators';
import { calendarReducer } from '../../ngrx/reducers/calendar.reducer';

@Component({
  selector: 'edu-term-names-and-dates-question',
  templateUrl: './term-names-and-dates-question.component.html',
  styleUrls: ['./term-names-and-dates-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TermNamesAndDatesQuestionComponent implements OnInit {
  calendarData: Observable<CalendarModel>;
  calendarDataArray: Observable<number[]>;
  termsAndDatesForm: FormGroup;
  constructor(private store: Store<CalendarStateModel>) { }
  ngOnInit(): void {
    this.calendarData = this.store.select(selectCalendar);
    this.calendarData.subscribe(
      (calendarData) => {
        const formControlArray = calendarData.termsAndDates.map(termAndDate=> {
          return new FormControl(termAndDate)
        });
        this.termsAndDatesForm = new FormGroup({
          termsAndDates: new FormArray(formControlArray)
        });
      }
    )


  }

}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { CalendarModel } from '../../models/calendar.model';
import { Store } from '@ngrx/store';
import { CalendarStateModel } from '../../models/calender-state.model';
import { selectCalendar } from '../../ngrx/selectors';
import { map, pluck, tap, first } from 'rxjs/operators';
import { calendarReducer } from '../../ngrx/reducers/calendar.reducer';
import {
  setTermName,
  setTermStartDate,
  setTermEndDate
} from '../../ngrx/actions/calendar.actions';

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
  constructor(private store: Store<CalendarStateModel>) {}
  ngOnInit(): void {
    this.calendarData = this.store.select(selectCalendar);
    this.calendarData.pipe(first()).subscribe(calendarData => {
      console.log(calendarData);
      const formGroups = calendarData.termsAndDates.map(termAndDate => {
        return new FormGroup({
          termName: new FormControl(termAndDate.termName, { updateOn: 'blur' }),
          startDate: new FormControl(termAndDate.startDate),
          endDate: new FormControl(termAndDate.endDate)
        });
      });

      this.termsAndDatesForm = new FormGroup({
        termsAndDates: new FormArray(formGroups)
      });
      this.termsAndDatesForm.controls.termsAndDates['controls'].forEach(
        (formGroup: FormGroup, idx) => {
          // formGroup.controls.termName.updateOn
          formGroup.controls.termName.valueChanges.subscribe(termName =>
            this.store.dispatch(setTermName({ idx, termName }))
          );
          formGroup.controls.startDate.valueChanges.subscribe(startDate =>
            this.store.dispatch(setTermStartDate({ idx, startDate }))
          );
          formGroup.controls.endDate.valueChanges.subscribe(endDate =>
            this.store.dispatch(setTermEndDate({ idx, endDate }))
          );
        }
      );
    });
  }
}

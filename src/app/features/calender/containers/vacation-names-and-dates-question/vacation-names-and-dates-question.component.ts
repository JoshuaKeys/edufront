import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CalendarModel } from '../../models/calendar.model';
import { selectCalendar } from '../../ngrx/selectors';
import { first, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  addVacation,
  setVacationName,
  setVacationStartDate,
  setVacationEndDate
} from '../../ngrx/actions/calendar.actions';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'edu-vacation-names-and-dates-question',
  templateUrl: './vacation-names-and-dates-question.component.html',
  styleUrls: ['./vacation-names-and-dates-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VacationNamesAndDatesQuestionComponent implements OnInit {
  vacationForm: FormGroup;
  calendarData: Observable<CalendarModel>;
  goNext() {
    this.router.navigate(['../', this.activatedRoute.snapshot.data.next], {
      relativeTo: this.activatedRoute
    });
  }
  addVacation() {
    this.store.dispatch(addVacation());
  }

  @ViewChild('scrollableEl') scrollableEl: ElementRef;
  startScroll(el) {
    if (typeof this.scrollableEl === 'undefined') {
      return true;
    }
    var vh = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    var scrollableHeight = this.scrollableEl.nativeElement.offsetHeight;
    var maxHeight = vh - 330;
    // console.log(
    //   'maxHeight - ' + maxHeight + ',scrollable - ' + scrollableHeight
    // );
    let res = scrollableHeight >= maxHeight - 10;
    // console.log(res);
    return res;
  }

  ngOnInit(): void {
    this.calendarData = this.store.select(selectCalendar);
    this.store
      .select(selectCalendar)
      // .pipe(first())
      .subscribe(calendarState => {
        console.log(calendarState);
        const formGroups = calendarState.vacations.map(vacation => {
          return new FormGroup(
            {
              vacationName: new FormControl(vacation.vacationName, {
                updateOn: 'blur'
              }),
              startDate: new FormControl(vacation.startDate),
              endDate: new FormControl(vacation.endDate)
            },
            {
              validators: vacationForm => {
                const startDate = vacationForm.value.startDate;
                const endDate = vacationForm.value.endDate;
                let errors = {
                  msg: []
                };
                if (!startDate || startDate.length === 0) {
                  errors.msg.push('Start Date is Empty');
                }
                if (!endDate || endDate.length === 0) {
                  errors.msg.push('End Date is Empty');
                }
                if (
                  startDate &&
                  startDate.length &&
                  endDate &&
                  endDate.length
                ) {
                  const startDateObj = new Date(startDate);
                  const endDateObj = new Date(endDate);
                  if (startDateObj.getTime() > endDateObj.getTime()) {
                    errors.msg.push('End Date must be more than start date');
                  }
                }
                if (!errors.msg.length) {
                  errors = null;
                }
                return errors;
              }
            }
          );
        });
        this.vacationForm = new FormGroup({
          vacationsAndDates: new FormArray(formGroups)
        });
        this.vacationForm.controls.vacationsAndDates['controls'].forEach(
          (formGroup: FormGroup, idx) => {
            // formGroup.controls.termName.updateOn
            formGroup.controls.vacationName.valueChanges.subscribe(
              vacationName => {
                this.store.dispatch(setVacationName({ idx, vacationName }));
              }
            );
            formGroup.controls.startDate.valueChanges.subscribe(startDate =>
              this.store.dispatch(setVacationStartDate({ idx, startDate }))
            );
            formGroup.controls.endDate.valueChanges.subscribe(endDate =>
              this.store.dispatch(setVacationEndDate({ idx, endDate }))
            );
          }
        );
        console.log(this.vacationForm);
      });
  }
  constructor(
    private store: Store<CalendarModel>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
}

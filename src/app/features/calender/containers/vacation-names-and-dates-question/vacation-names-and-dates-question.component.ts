import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CalendarModel } from '../../models/calendar.model';
import { selectCalendar } from '../../ngrx/selectors';
import { first, take, skip } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {
  addVacation,
  setVacationName,
  setVacationStartDate,
  setVacationEndDate,
  removeVacation
} from '../../ngrx/actions/calendar.actions';
import { Router, ActivatedRoute } from '@angular/router';
import { validateTermsAndDates } from '../../utilities';

@Component({
  selector: 'edu-vacation-names-and-dates-question',
  templateUrl: './vacation-names-and-dates-question.component.html',
  styleUrls: ['./vacation-names-and-dates-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VacationNamesAndDatesQuestionComponent
  implements OnInit, AfterViewInit {
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
  getValues(item) {
    console.log(item);
    return Object.values(item);
  }
  shouldScroll = false;
  @ViewChild('scrollableEl') scrollableEl: ElementRef;
  @ViewChild('errors') errors: ElementRef;
  startScroll() {
    if (typeof this.scrollableEl === 'undefined') {
      return true;
    }
    var vh = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    var scrollableHeight = this.scrollableEl.nativeElement.offsetHeight;
    var errorHeight = this.errors.nativeElement.offsetHeight + 28;
    var maxHeight = vh - 330;

    // console.log('scrollableHeight - ' + scrollableHeight);
    // console.log('maxHeight - ' + maxHeight);
    // console.log('errorHeight - ' + errorHeight);
    let res = scrollableHeight + errorHeight + 20 >= maxHeight;
    return res;
  }
  setShouldScroll() {
    this.shouldScroll = !this.startScroll();
    console.log(this.shouldScroll);
  }
  getNewVacationForm(vacationName, startDate, endDate) {
    return new FormGroup(
      {
        vacationName: new FormControl(vacationName, {
          validators: Validators.required
        }),
        startDate: new FormControl(startDate),
        endDate: new FormControl(endDate)
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
          if (startDate && startDate.length && endDate && endDate.length) {
            const startDateObj = new Date(startDate);
            const endDateObj = new Date(endDate);
            if (startDateObj.getTime() >= endDateObj.getTime()) {
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
  }
  ngOnInit(): void {
    this.calendarData = this.store.select(selectCalendar);
    this.vacationForm = new FormGroup({
      vacationsAndDates: new FormArray([this.getNewVacationForm('', '', '')])
    });
    this.store.select(selectCalendar).subscribe(calendarState => {
      const formGroups = calendarState.vacations.map(vacation => {
        return new FormGroup({
          vacationName: new FormControl(vacation.vacationName, {
            validators: Validators.required
          }),
          startDate: new FormControl(vacation.startDate),
          endDate: new FormControl(vacation.endDate)
        });
      });
      this.vacationForm.controls.vacationsAndDates = new FormArray(formGroups, {
        validators: (formArray: FormArray) => {
          let result = [];
          formArray.controls.forEach((formGroup, index) => {
            let msg = validateTermsAndDates(
              formGroup,
              calendarState,
              index,
              'Vacation'
            );
            if (msg) {
              result.push(msg.msg);
            }
          });
          return result;
        }
      });
      this.setShouldScroll();
    });
  }

  ngAfterViewInit() {
    this.setShouldScroll();
  }

  isFormInvalid() {
    return this.vacationForm.controls.vacationsAndDates.invalid;
  }
  updateTitle(vacationName, idx) {
    // console.log('update title' + ` idx ${idx}, vacationName ${vacationName}`);
    this.store.dispatch(setVacationName({ idx, vacationName }));
  }
  updateStart(startDate, idx) {
    // console.log('update updateStart' + ` idx ${idx}, startDate ${startDate}`);

    this.store.dispatch(setVacationStartDate({ idx, startDate }));
  }
  updateEnd(endDate, idx) {
    // console.log('update updateEnd' + ` idx ${idx}, endDate ${endDate}`);

    this.store.dispatch(setVacationEndDate({ idx, endDate }));
  }

  getElementId(index, value) {
    return `${value}--${index}`;
  }

  removeItem(i: number) {
    this.store.dispatch(removeVacation({ index: i }));
    (this.vacationForm.controls.vacationsAndDates as FormArray).removeAt(i);
  }
  constructor(
    private store: Store<CalendarModel>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
}

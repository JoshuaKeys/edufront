import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
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
  setTermEndDate,
  initializeVacations
} from '../../ngrx/actions/calendar.actions';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'edu-term-names-and-dates-question',
  templateUrl: './term-names-and-dates-question.component.html',
  styleUrls: ['./term-names-and-dates-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TermNamesAndDatesQuestionComponent
  implements OnInit, AfterViewInit {
  calendarData: Observable<CalendarModel>;
  calendarDataArray: Observable<number[]>;
  termsAndDatesForm: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<CalendarStateModel>,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}
  log(item) {
    console.log(item);
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

  goNext() {
    this.store.dispatch(initializeVacations());
    this.router.navigate(['../', this.activatedRoute.snapshot.data.next], {
      relativeTo: this.activatedRoute
    });
  }

  ngAfterViewInit() {
    this.cd.markForCheck();
  }
  ngOnInit(): void {
    this.calendarData = this.store.select(selectCalendar);
    this.calendarData.pipe(first()).subscribe(calendarData => {
      console.log(calendarData);
      const formGroups = calendarData.termsAndDates.map(termAndDate => {
        return new FormGroup(
          {
            termName: new FormControl(termAndDate.termName, {
              updateOn: 'blur'
            }),
            startDate: new FormControl(termAndDate.startDate),
            endDate: new FormControl(termAndDate.endDate)
          },
          {
            validators: termsandDatesForm => {
              const startDate = termsandDatesForm.value.startDate;
              const endDate = termsandDatesForm.value.endDate;
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

      this.termsAndDatesForm = new FormGroup({
        termsAndDates: new FormArray(formGroups)
      });
      this.termsAndDatesForm.controls.termsAndDates['controls'].forEach(
        (formGroup: FormGroup, idx) => {
          // formGroup.controls.termName.updateOn
          formGroup.controls.termName.valueChanges.subscribe(termName => {
            this.store.dispatch(setTermName({ idx, termName }));
          });
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

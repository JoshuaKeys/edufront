import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
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
import { validateTermsAndDates } from '../../utilities';

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

  getElementId(index, value) {
    return `${value}--${index}`;
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

  goNext() {
    this.store.dispatch(initializeVacations());
    this.router.navigate(['../', this.activatedRoute.snapshot.data.next], {
      relativeTo: this.activatedRoute
    });
  }
  getValues(item) {
    return Object.values(item);
  }
  ngAfterViewInit() {
    this.cd.markForCheck();

    this.setShouldScroll();
  }
  ngOnInit(): void {
    this.termsAndDatesForm = new FormGroup({
      termsAndDates: new FormArray([])
    });
    this.calendarData = this.store.select(selectCalendar);
    this.calendarData.subscribe(calendarData => {
      const formGroups = calendarData.termsAndDates.map(termAndDate => {
        return new FormGroup({
          termName: new FormControl(termAndDate.termName, {
            validators: Validators.required
          }),
          startDate: new FormControl(termAndDate.startDate),
          endDate: new FormControl(termAndDate.endDate)
        });
      });

      this.termsAndDatesForm = new FormGroup({
        termsAndDates: new FormArray(formGroups, {
          validators: (formArray: FormArray) => {
            let result = [];
            formArray.controls.forEach((formGroup, index) => {
              const msg = validateTermsAndDates(
                formGroup,
                calendarData,
                index,
                'Term'
              );
              if (msg) result.push(msg.msg);
            });
            return result;
          }
        })
      });
    });
  }

  setShouldScroll() {
    this.shouldScroll = !this.startScroll();
    console.log(this.shouldScroll);
  }
  updateTitle(termName, idx) {
    console.log('update title' + ` idx ${idx}, termname ${termName}`);
    this.store.dispatch(setTermName({ idx, termName }));
  }
  updateStart(startDate, idx) {
    console.log('update updateStart' + ` idx ${idx}, startDate ${startDate}`);
    this.store.dispatch(setTermStartDate({ idx, startDate }));
  }
  updateEnd(endDate, idx) {
    console.log('update updateEnd' + ` idx ${idx}, endDate ${endDate}`);
    this.store.dispatch(setTermEndDate({ idx, endDate }));
  }
}

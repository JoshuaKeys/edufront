import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { CalendarStateModel } from './../../models/calender-state.model'
import * as calendarActions from '../../ngrx/actions';
import { Observable } from 'rxjs';
import { CalendarModalModel } from '../../models/calender-modal.model';
import * as calendarSelectors from '../../ngrx/selectors'
import { FormGroup, FormControl, ValidationErrors } from '@angular/forms';
import { setPreviewAcademicYearStartDate, setPreviewAcademicYearEndDate, setAcademicYearStartDate, setAcademicYearEndDate } from '../../ngrx/actions/calendar.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
@Component({
  selector: 'edu-academic-year-question',
  templateUrl: './academic-year-question.component.html',
  styleUrls: ['./academic-year-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcademicYearQuestionComponent implements OnInit {
  calendarModalState: Observable<CalendarModalModel>;
  academicYearForm: FormGroup;
  activatedRouteData = this.activatedRoute.snapshot.data
  goNext() {
    this.router.navigate(['../', this.activatedRouteData['next']], {relativeTo: this.activatedRoute})
  }
  getFormErrors(error: ValidationErrors) {
    
  }
  onDateDataChanged(dateData: string) {
    // this.academicYearForm.patchValue({
      
    // })
    console.log(dateData)
  }
  ngOnInit(): void {
    this.store.select(calendarSelectors.selectCalendar).subscribe(console.log)
    this.store.select(calendarSelectors.selectCalendar).pipe(
      first()
    ).subscribe(
      calendarState => {
        console.log('hellooo', calendarState.currentAcademicYear)
        console.log(calendarState && calendarState.currentAcademicYear? calendarState.currentAcademicYear.startDate : null)
        this.academicYearForm = new FormGroup({
          startDate: new FormControl(calendarState && calendarState.currentAcademicYear? calendarState.currentAcademicYear.startDate : null),
          // startDate: new FormControl('2019-01-01'),
          endDate: new FormControl(calendarState && calendarState.currentAcademicYear? calendarState.currentAcademicYear.endDate : null),
        })
        this.academicYearForm.controls.startDate.valueChanges.subscribe((startDate: string)=> {
          this.store.dispatch(setPreviewAcademicYearStartDate({startDate: startDate.substr(0, 4)}));
          this.store.dispatch(setAcademicYearStartDate({startDate}));
        })
        this.academicYearForm.controls.endDate.valueChanges.subscribe((endDate: string)=> {
          this.store.dispatch(setPreviewAcademicYearEndDate({endDate: endDate.substr(0, 4)}));
          this.store.dispatch(setAcademicYearEndDate({endDate}))
        })
        this.academicYearForm.validator = (academicYearForm)=> {
          const startDate = academicYearForm.value.startDate;
          const endDate = academicYearForm.value.endDate;
          let errors = {
            msg: []
          };
          if(!startDate || startDate.length === 0) {
            errors.msg.push('Start Date is Empty')
          }
          if(!endDate || endDate.length === 0) {
            errors.msg.push('End Date is Empty')
          }
          if(startDate && startDate.length && endDate && endDate.length) {
            const startDateObj = new Date(startDate);
            const endDateObj = new Date(endDate);
            if(startDateObj.getTime() > endDateObj.getTime()) {
              errors.msg.push('End Date must be more than start date')
            }
          }
          
          if(!errors.msg.length) {
            errors = null;
          }
          return errors;
        }
      }
    );
    this.calendarModalState = this.store.select(calendarSelectors.selectCalendarModalState)
  }
  formSubmit() {

  }
  closeStartModal() {
    this.store.dispatch(calendarActions.toggleStartModal())
  }
  constructor(
    private store: Store<CalendarStateModel>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }
}

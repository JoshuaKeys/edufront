import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { CalendarStateModel } from './../../models/calender-state.model'
import * as calendarActions from '../../ngrx/actions';
import { Observable } from 'rxjs';
import { CalendarModalModel } from '../../models/calender-modal.model';
import * as calendarSelectors from '../../ngrx/selectors'
import { FormGroup, FormControl, ValidationErrors } from '@angular/forms';
import { setAcademicYearStartDate, setAcademicYearEndDate } from '../../ngrx/actions/calendar.actions';
import { ActivatedRoute, Router } from '@angular/router';
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
  ngOnInit(): void {
    this.store.select(calendarSelectors.selectCalendar).subscribe(
      calendarState => {
        // this.academicYearForm = new FormGroup({
        //   startDate: new FormControl(calendarState.currentAcademicYear? calendarState.currentAcademicYear.startDate : ''),
        //   endDate: new FormControl(calendarState.currentAcademicYear? calendarState.currentAcademicYear.endDate : ''),
        // })
        this.academicYearForm = new FormGroup({
          startDate: new FormControl('2020-09-09'),
          endDate: new FormControl('2020-01-05'),
        })
        this.academicYearForm.validator = (academicYearForm)=> {
          const startDate = academicYearForm.value.startDate;
          const endDate = academicYearForm.value.endDate;
          let errors = {
            msg: []
          };
          if(startDate.length === 0) {
            errors.msg.push('Start Date is Empty')
          }
          if(endDate.length === 0) {
            errors.msg.push('End Date is Empty')
          }
          if(startDate.length && endDate.length) {
            const startDateObj = new Date(startDate);
            const endDateObj = new Date(endDate);
            if(startDateObj.getTime() > endDateObj.getTime()) {
              errors.msg.push('End Date must be more than start date')
            }
          }
          
          if(!errors.msg.length) {
            errors = null;
          }
          console.log(errors)
          return errors;
        }
      }
    )
   
    this.calendarModalState = this.store.select(calendarSelectors.selectCalendarModalState)
    this.academicYearForm.controls.startDate.valueChanges.subscribe((startDate: string)=> {
      console.log(startDate)
      this.store.dispatch(setAcademicYearStartDate({startDate: startDate.substr(0, 4)}))
    })
    this.academicYearForm.controls.endDate.valueChanges.subscribe((endDate: string)=> {
      this.store.dispatch(setAcademicYearEndDate({endDate: endDate.substr(0, 4)}))
    })
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

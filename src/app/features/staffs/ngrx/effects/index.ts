import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  fetchStaffsRequest,
  fetchStaffsSuccess,
  fetchClassesRequest,
  fetchClassesSuccess,
  fetchSubjectsRequest,
  fetchSubjectSuccess,
  addClassToSubjectRequest,
  toggleClassInSubject,
  doNothing,
  createStaffResponse,
  createStaffRequest,
  toggleAddEditModal,
  deleteStaffRequest,
  deleteStaffSuccess
} from '../actions';
import { mergeMap, map, withLatestFrom } from 'rxjs/operators';
import { StaffsService } from '../../services/staffs.service';
import { SubjectsService } from 'src/app/shared/services/subjects.service';
import { ClassesService } from 'src/app/shared/services/classes.service';
import { Store } from '@ngrx/store';
import { StaffsStateModel } from '../../models/staff-state.model';
import { selectSelectedSubject, classesAndSubjectsAssoc } from '../selectors';
import { StaffFormModel } from '../../models/staff-form.model';
import { SubjectClassesAssociation } from '../../models/subject-classes-association.model';
import { CreateStaffRequestModel } from '../../models/create-staff-request.model';

@Injectable()
export class StaffsEffects {
  fetchStaffsRequest$ = createEffect(() => this.actions$.pipe(
    ofType(fetchStaffsRequest),
    mergeMap(_ => this.staffsService.getStaff().pipe(
      map(staffs => fetchStaffsSuccess({ staffs }))
    ))
  ))
  fetchSubjectsRequest$ = createEffect(() => this.actions$.pipe(
    ofType(fetchSubjectsRequest),
    mergeMap(action => this.subjectsService.getAllSubjects().pipe(
      map(subjects => fetchSubjectSuccess({ subjects }))
    ))
  ))
  fetchClassesRequest$ = createEffect(() => this.actions$.pipe(
    ofType(fetchClassesRequest),
    mergeMap(action => this.classesService.getClasses().pipe(
      map(classes => fetchClassesSuccess({ classes }))
    ))
  ))
  addClassToSubject$ = createEffect(() => this.actions$.pipe(
    ofType(addClassToSubjectRequest),
    withLatestFrom(this.store.select(selectSelectedSubject)),
    map(([action, selectedSubject]) => {
      if (!selectedSubject) {
        return doNothing();
      }
      return toggleClassInSubject({
        subjectId: selectedSubject.id,
        class: action.class
      })
    })
  ));
  createStaffRequest$ = createEffect(() => this.actions$.pipe(
    ofType(createStaffRequest),
    withLatestFrom(this.store.select(classesAndSubjectsAssoc)),
    mergeMap(([action, subjectsAssociation]) => {
      return this.staffsService.uploadLogo(action.staff.profilePic.acceptedFile).pipe(
        mergeMap(res => {
          const createStaffRequestObj = this.composeCreateStaffData(action.staff, subjectsAssociation, res.file)
          return this.staffsService.createStaff(createStaffRequestObj).pipe(
            mergeMap(response => [createStaffResponse({ staff: response }), toggleAddEditModal()])
          );
        })
      )
    })
  ));
  deleteStaffReqest$ = createEffect(() => this.actions$.pipe(
    ofType(deleteStaffRequest),
    mergeMap(action => this.staffsService.deleteStaff(action.staff.id).pipe(
      map(resp => deleteStaffSuccess({ staff: action.staff }))
    ))
  ));
  composeCreateStaffData(staffData: StaffFormModel, subjectData: SubjectClassesAssociation[], profilePic: string): CreateStaffRequestModel {
    let createStaffObj: CreateStaffRequestModel = {
      subjectClasses: null,
      profileDto: null
    };

    createStaffObj['subjectClasses'] = subjectData.map(item => {
      let classIds = item.classes.map(classItem => classItem.id)
      return {
        subjectId: item.subjectId,
        classids: classIds
      }
    })



    createStaffObj['profileDto'] = {
      contexts: ['TEACHER'],
      dob: staffData.dob,
      email: staffData.email,
      firstName: staffData.firstName,
      gender: staffData.sex,
      lastName: staffData.familyName,
      middleName: staffData.middleName,
      profileImage: profilePic,
      countryId: staffData.country.id,
      address: staffData.address,
      city: staffData.city,
      state: staffData.state,
      zipcode: staffData.zip,
      createdCode: false,
      phone: staffData.phone.phoneNum,
    }
    return createStaffObj;
  }
  constructor(
    private actions$: Actions,
    private staffsService: StaffsService,
    private subjectsService: SubjectsService,
    private classesService: ClassesService,
    private store: Store<StaffsStateModel>
  ) { }
}

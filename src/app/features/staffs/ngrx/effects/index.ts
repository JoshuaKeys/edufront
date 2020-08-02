import { Injectable } from '@angular/core';
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
  toggleAddModal,
  deleteStaffRequest,
  deleteStaffSuccess,
  fetchStaffById,
  fetchStaffByIdSuccess,
  toggleEditModal,
  editStaffRequest,
  editStaffResponse,
  setEditClassesSubjectsAssociation,
  uploadStaffViaExcel,
  updateStaffs,
  insertStaffs,
  uploadStaffViaExcelError
} from '../actions';
import {
  mergeMap,
  map,
  withLatestFrom,
  switchMap,
  catchError
} from 'rxjs/operators';
import { StaffsService } from '../../services/staffs.service';
import { SubjectsService } from 'src/app/shared/services/subjects.service';
import { ClassesService } from 'src/app/shared/services/classes.service';
import { Store } from '@ngrx/store';
import { StaffsStateModel } from '../../models/staff-state.model';
import {
  selectSelectedSubject,
  classesAndSubjectsAssoc,
  selectAllStaffs
} from '../selectors';
import { StaffFormModel } from '../../models/staff-form.model';
import { CreateStaffRequestModel } from '../../models/create-staff-request.model';
import { forkJoin, of } from 'rxjs';
import { StaffStudentService } from 'src/app/shared/services/staff-student.service';
@Injectable()
export class StaffsEffects {
  uploadStudentsViaExcel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uploadStaffViaExcel),
      withLatestFrom(this.store.select(selectAllStaffs)),
      mergeMap(([action, existingStaffs]) =>
        this.staffStudentSharedService.uploadProfileApi(action.file).pipe(
          mergeMap(staffs => {
            console.log(staffs);
            let createArr = [];
            let updateArr = [];
            staffs.forEach(staff => {
              let _staff = JSON.parse(JSON.stringify(staff));

              let currentStudentWithSameId = existingStaffs.find(
                existingStaffs => existingStaffs.id === _staff.id
              );
              if (currentStudentWithSameId !== undefined) {
                updateArr.push(_staff);
              } else {
                createArr.push(_staff);
              }
            });
            return [
              updateStaffs({ staff: updateArr }),
              insertStaffs({ staff: createArr })
            ];
          }),
          catchError(error => of(uploadStaffViaExcelError({ error })))
        )
      )
    )
  );
  //   updateStaffs
  // insertStaffs
  // uploadStaffViaExcelError
  fetchStaffsRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchStaffsRequest),
      mergeMap(_ =>
        this.staffsService
          .getStaff()
          .pipe(map(staffs => fetchStaffsSuccess({ staffs })))
      )
    )
  );
  fetchSubjectsRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchSubjectsRequest),
      mergeMap(action =>
        this.subjectsService
          .getAllSubjects()
          .pipe(map(subjects => fetchSubjectSuccess({ subjects })))
      )
    )
  );
  fetchClassesRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchClassesRequest),
      mergeMap(action =>
        this.classesService
          .getClasses()
          .pipe(map(classes => fetchClassesSuccess({ classes })))
      )
    )
  );
  addClassToSubject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addClassToSubjectRequest),
      withLatestFrom(this.store.select(selectSelectedSubject)),
      map(([action, selectedSubject]) => {
        if (!selectedSubject) {
          return doNothing();
        }
        return toggleClassInSubject({
          subjectId: selectedSubject.id,
          class: action.class
        });
      })
    )
  );
  editStaffRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editStaffRequest),
      withLatestFrom(this.store.select(classesAndSubjectsAssoc)),
      mergeMap(([action, subjectsAssociation]) => {
        if (action.staff.profilePic.imageUrl) {
          const createStaffRequestObj = this.composeCreateStaffData(
            action.staff,
            subjectsAssociation,
            action.staff.profilePic.imageUrl
          );
          return this.staffsService
            .editStaff(createStaffRequestObj)
            .pipe(
              mergeMap(response => [
                editStaffResponse({ staff: response }),
                toggleEditModal()
              ])
            );
        }
        if (action.staff.profilePic.acceptedFile) {
          return this.staffsService
            .uploadLogo(action.staff.profilePic.acceptedFile)
            .pipe(
              mergeMap(res => {
                const createStaffRequestObj = this.composeCreateStaffData(
                  action.staff,
                  subjectsAssociation,
                  res.file
                );
                return this.staffsService
                  .editStaff(createStaffRequestObj)
                  .pipe(
                    mergeMap(response => [
                      editStaffResponse({ staff: response }),
                      toggleEditModal()
                    ])
                  );
              })
            );
        }

        const createStaffRequestObj = this.composeCreateStaffData(
          action.staff,
          subjectsAssociation,
          null
        );
        return this.staffsService
          .editStaff(createStaffRequestObj)
          .pipe(
            mergeMap(response => [
              editStaffResponse({ staff: response }),
              toggleEditModal()
            ])
          );
      })
    )
  );
  createStaffRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createStaffRequest),
      withLatestFrom(this.store.select(classesAndSubjectsAssoc)),
      mergeMap(([action, subjectsAssociation]) => {
        if (action.staff.profilePic) {
          return this.staffsService
            .uploadLogo(action.staff.profilePic.acceptedFile)
            .pipe(
              mergeMap(res => {
                const createStaffRequestObj = this.composeCreateStaffData(
                  action.staff,
                  subjectsAssociation,
                  res.file
                );
                return this.staffsService
                  .createStaff(createStaffRequestObj)
                  .pipe(
                    mergeMap(response => [
                      createStaffResponse({ staff: response }),
                      toggleAddModal()
                    ])
                  );
              })
            );
        }
        const createStaffRequestObj = this.composeCreateStaffData(
          action.staff,
          subjectsAssociation,
          null
        );
        return this.staffsService
          .createStaff(createStaffRequestObj)
          .pipe(
            mergeMap(response => [
              createStaffResponse({ staff: response }),
              toggleAddModal()
            ])
          );
      })
    )
  );
  fetchStaffById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchStaffById),
      mergeMap(action => {
        return forkJoin(
          this.staffsService.fetchStaffById(action.staff),
          this.staffsService.fetchClassesSubjects(action.staff)
        ).pipe(
          mergeMap(([staff, associationResponse]) => {
            const associations = associationResponse.map(association => {
              return {
                subjectId: association['subject']['id'],
                classes: association.classes
              };
            });
            console.log(associationResponse);
            return [
              fetchStaffByIdSuccess({ staff, profileId: action.staff.id }),
              toggleEditModal(),
              setEditClassesSubjectsAssociation({ associations })
            ];
          })
        );
      })
    )
  );
  deleteStaffReqest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteStaffRequest),
      mergeMap(action =>
        this.staffsService
          .deleteStaff(action.staff.id)
          .pipe(map(resp => deleteStaffSuccess({ staff: action.staff })))
      )
    )
  );
  composeCreateStaffData(
    staff: StaffFormModel,
    subjectsAssociation,
    file: string
  ) {
    const staffCopy: StaffFormModel = { ...staff };
    console.log(staff);
    const staffReqObj: CreateStaffRequestModel = {
      profileDto: {},
      subjectClasses: []
    };

    if (subjectsAssociation) {
      staffReqObj.subjectClasses = subjectsAssociation.map(item => {
        let classIds = item.classes.map(classItem => classItem.id);
        return {
          subjectId: item.subjectId,
          classids: classIds
        };
      });
    }
    staffReqObj.profileDto.contexts = ['TEACHER'];
    if (staffCopy.profilePic) {
      staffReqObj.profileDto.profileImage = file;
    }
    if (staffCopy.id) {
      staffReqObj.profileDto.id = staffCopy.id;
    }
    if (staffCopy.phone.phoneNum) {
      staffReqObj.profileDto.phone = staffCopy.phone.phoneNum;
    } else {
      console.log(staffCopy);
    }
    if (staffCopy.city) {
      staffReqObj.profileDto.city = staffCopy.city;
    }
    if (staffCopy.address) {
      staffReqObj.profileDto.address = staffCopy.address;
    }
    if (staffCopy.email) {
      staffReqObj.profileDto.email = staffCopy.email;
    }
    if (staffCopy.firstName) {
      staffReqObj.profileDto.firstName = staffCopy.firstName;
    }
    if (staffCopy.zip) {
      staffReqObj.profileDto.zipcode = staffCopy.zip;
    }
    if (staffCopy.familyName) {
      staffReqObj.profileDto.lastName = staffCopy.familyName;
    }
    if (staffCopy.middleName) {
      staffReqObj.profileDto.middleName = staffCopy.middleName;
    }
    if (staffCopy.sex) {
      staffReqObj.profileDto.gender = staffCopy.sex;
    }
    if (staffCopy.state) {
      staffReqObj.profileDto.state = staffCopy.state;
    }
    if (staffCopy.dob) {
      staffReqObj.profileDto.dob = staffCopy.dob;
    }
    if (staffCopy.country) {
      staffReqObj.profileDto.countryId = staffCopy.country.id;
    }
    return staffReqObj;
  }
  constructor(
    private actions$: Actions,
    private staffsService: StaffsService,
    private subjectsService: SubjectsService,
    private classesService: ClassesService,
    private store: Store<StaffsStateModel>,
    private staffStudentSharedService: StaffStudentService
  ) { }
}

import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { uploadSchoolLogoRequest, setSchoolLogo, createSchoolRequest, toggleProfileEndModal } from '../actions';
import { mergeMap, map, withLatestFrom, switchMap } from 'rxjs/operators';
import { SchoolProfileService } from '../../services/school-profile.service';
import { Store } from '@ngrx/store';
import { SchoolProfileModel } from '../../models/school-profile.model';
import { selectSchoolProfile } from '../selectors';
import { CreateSchoolModel } from '../../models/create-school.model';
import { ProfileModel } from '../../models/profile.model';
import { incrementProgress } from 'src/app/features/dashboard/ngrx/actions';

@Injectable()
export class SchoolProfileEffects {
  uploadLogo$ = createEffect(() => this.actions$.pipe(
    ofType(uploadSchoolLogoRequest),
    mergeMap(action => this.schoolProfileService.uploadLogo(action.logo).pipe(
      map(response => setSchoolLogo({ logo: response.file, preview: action.preview }))
    ))
  ))
  createSchoolRequest = createEffect(() => this.actions$.pipe(
    ofType(createSchoolRequest),
    withLatestFrom(this.store.select(selectSchoolProfile)),
    mergeMap(([action, schoolProfile]) => {
      const schoolData = this.getSchoolReqData(schoolProfile);
      return this.schoolProfileService.createSchool(schoolData).pipe(
        switchMap(res => {
          localStorage.setItem('schoolId', res.id);
         return [toggleProfileEndModal(), incrementProgress()];
        })
      )
    })
  ))
  getSchoolReqData(schoolProfile: ProfileModel): CreateSchoolModel {
    return {
      addressDto: {
        address: schoolProfile.address.address,
        city: schoolProfile.address.city,
        countryId: schoolProfile.address.countryId,
        zipcode: schoolProfile.address.zipCode,
        state: schoolProfile.address.state
      },
      name: schoolProfile.schoolName,
      email: schoolProfile.contact.email,
      phoneNo: schoolProfile.contact.phone.phoneNum,
      website: schoolProfile.contact.website,
      logo: schoolProfile.schoolLogo ? schoolProfile.schoolLogo : undefined
    }
  }
  constructor(
    private actions$: Actions,
    private schoolProfileService: SchoolProfileService,
    private store: Store<SchoolProfileModel>
  ) { }
}

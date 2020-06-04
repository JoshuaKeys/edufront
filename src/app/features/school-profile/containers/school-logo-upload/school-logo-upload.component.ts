import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ProfileModel } from '../../models/profile.model';
import { setSchoolLogo, uploadSchoolLogoRequest } from '../../ngrx/actions';
// import { uploadSchoolLogoRe } from 'src/app/features/school-profile/ngrx/actions';
import { selectSchoolLogo, selectLogoPreview } from '../../ngrx/selectors';
import { withLatestFrom, first, tap } from 'rxjs/operators';

@Component({
  selector: 'edu-school-logo-upload',
  templateUrl: './school-logo-upload.component.html',
  styleUrls: ['./school-logo-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolLogoUploadComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data;
  uploadForm: FormGroup;

  ngOnInit(): void {
    this.store.select(selectSchoolLogo).pipe(
      withLatestFrom(this.store.select(selectLogoPreview)),
    ).subscribe(([image, logoPreview]) => {
      let schoolLogo;
      if (image) {
        schoolLogo = { base64: logoPreview };
      } else {
        schoolLogo = null;
      }
      this.uploadForm = new FormGroup({
        image: new FormControl(schoolLogo, Validators.required)
      })
    })
  }
  onImageUpload(img: { base64: string, imageUrl: string, acceptedFile: File }) {
    this.uploadForm.patchValue({
      image: img
    })
    this.store.dispatch(uploadSchoolLogoRequest({ logo: img.acceptedFile, preview: img.base64 }))
  }
  constructor(
    private store: Store<ProfileModel>,
    private activatedRoute: ActivatedRoute) { }
}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PreviewModel } from 'src/app/features/school-profile/models/preview.model';
import { Observable } from 'rxjs';
import { SchoolProfileModel } from 'src/app/features/school-profile/models/school-profile.model';
import { Store } from '@ngrx/store';
import {
  fetchStaffsRequest,
  fetchClassesRequest,
  fetchSubjectsRequest,
  uploadStaffViaExcel
} from '../../ngrx/actions';
import { selectAllStaffs } from '../../ngrx/selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'edu-staffs-shell',
  templateUrl: './staffs-shell.component.html',
  styleUrls: ['./staffs-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffsShellComponent implements OnInit {
  previewState: Observable<PreviewModel[]>;
  allStaffs: Observable<number>;

  ngOnInit(): void {
    this.allStaffs = this.store
      .select(selectAllStaffs)
      .pipe(map(staffs => staffs.length));
    // this.previewState = this.store.select(selectPreviewState);
    this.store.dispatch(fetchStaffsRequest());
    this.store.dispatch(fetchClassesRequest());
    this.store.dispatch(fetchSubjectsRequest());
    // this.store.select(selectAllStaffs).subscribe(console.log);
  }
  constructor(private store: Store<SchoolProfileModel>) {}

  newExcelFileUpload(excelFile: File) {
    this.store.dispatch(uploadStaffViaExcel({ file: excelFile }));
  }
}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PreviewModel } from 'src/app/features/school-profile-v2/models/preview.model';
import { Observable } from 'rxjs';
import { selectPreviewState } from 'src/app/features/school-profile-v2/ngrx/selectors';
import { SchoolProfileModel } from 'src/app/features/school-profile-v2/models/school-profile.model';
import { Store } from '@ngrx/store';
import { fetchStaffsRequest } from '../../ngrx/actions';
import { selectAllStaffs } from '../../ngrx/selectors';

@Component({
  selector: 'edu-staffs-shell',
  templateUrl: './staffs-shell.component.html',
  styleUrls: ['./staffs-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffsShellComponent implements OnInit {
  previewState: Observable<PreviewModel[]>


  ngOnInit(): void {
    // this.previewState = this.store.select(selectPreviewState);
    this.store.dispatch(fetchStaffsRequest())
    // this.store.select(selectAllStaffs).subscribe(console.log);
  }
  constructor(private store: Store<SchoolProfileModel>) { }
}

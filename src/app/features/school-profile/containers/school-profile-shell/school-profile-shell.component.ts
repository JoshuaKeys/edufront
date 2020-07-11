import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { PreviewModel, SchoolPreviewModel } from '../../models/preview.model';
import { Store } from '@ngrx/store';
import { SchoolProfileModel } from '../../models/school-profile.model';
import { selectPreviewState } from '../../ngrx/selectors';

@Component({
  selector: 'edu-school-profile-shell',
  templateUrl: './school-profile-shell.component.html',
  styleUrls: ['./school-profile-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolProfileShellComponent implements OnInit {
  previewState: Observable<SchoolPreviewModel>


  ngOnInit(): void {
    this.previewState = this.store.select(selectPreviewState);
  }
  constructor(private store: Store<SchoolProfileModel>) { }
}

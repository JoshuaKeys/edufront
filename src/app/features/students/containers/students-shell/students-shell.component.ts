import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { StudentsStateModel } from '../../models/students-state.model';
import {
  initClassesAndStudentsRequest,
  uploadStudentsViaExcel
} from '../../ngrx/actions/class-students.actions';

@Component({
  selector: 'edu-students-shell',
  templateUrl: './students-shell.component.html',
  styleUrls: ['./students-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentsShellComponent implements OnInit {
  ngOnInit(): void {
    this.store.dispatch(initClassesAndStudentsRequest());
  }

  constructor(private store: Store<StudentsStateModel>) {}

  newExcelFileUpload(excelFile: File) {
    this.store.dispatch(uploadStudentsViaExcel({ file: excelFile }));
    console.log(excelFile);
  }
}

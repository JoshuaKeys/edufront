import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { StudentsStateModel } from '../../models/students-state.model';
import { initClassesAndStudentsRequest, uploadExcelSheets } from '../../ngrx/actions/class-students.actions';

@Component({
  selector: 'edu-students-shell',
  templateUrl: './students-shell.component.html',
  styleUrls: ['./students-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentsShellComponent implements OnInit {
  classList;
  ngOnInit(): void {
    this.store.dispatch(initClassesAndStudentsRequest())
  }
  handleDrop(event) {
    event.preventDefault();
    this.store.dispatch(uploadExcelSheets({ file: event.dataTransfer.files[0] }))
  }
  handleDragOver(event) {
    event.preventDefault();
    this.classList = {
      'card--active': true
    }
  }
  handleDragLeave(event) {
    event.preventDefault();
    this.classList = {}
  }
  constructor(private store: Store<StudentsStateModel>) { }
}

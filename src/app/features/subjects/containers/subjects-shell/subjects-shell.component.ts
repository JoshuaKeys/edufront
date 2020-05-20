import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { SubjectsStateModel } from '../../models/subjects-state.model';
import * as fromSubjectActions from '../../ngrx/actions/index'
@Component({
  selector: 'edu-subjects-shell',
  templateUrl: './subjects-shell.component.html',
  styleUrls: ['./subjects-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubjectsShellComponent implements OnInit {



  ngOnInit(): void {
    this.store.dispatch(fromSubjectActions.getClassesRequest())
  }
  constructor(private store: Store<SubjectsStateModel>) { }
}

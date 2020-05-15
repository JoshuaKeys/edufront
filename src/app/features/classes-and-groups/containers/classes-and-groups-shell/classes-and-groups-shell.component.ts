import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ClassesAndGroupsModel } from '../../models/classes-and-group.model';
import { Store } from '@ngrx/store';
import { getClassesRequest } from '../../ngrx/actions';

@Component({
  selector: 'edu-classes-and-groups-shell',
  templateUrl: './classes-and-groups-shell.component.html',
  styleUrls: ['./classes-and-groups-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassesAndGroupsShellComponent implements OnInit {

  constructor(private store: Store<ClassesAndGroupsModel>) { }

  ngOnInit(): void {
    this.store.dispatch(getClassesRequest())
  }

}

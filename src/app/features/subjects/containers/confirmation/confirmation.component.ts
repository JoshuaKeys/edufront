import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { SubjectsStateModel } from '../../models/subjects-state.model';
import { ClassModel } from 'src/app/shared/models/class.model';
import { Observable } from 'rxjs';
import { selectSortedClasses, getAllSelectedClasses } from '../../ngrx/selectors';

@Component({
  selector: 'edu-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data;
  classes: Observable<ClassModel[]>;
  ngOnInit(): void {
    this.classes = this.store.select(getAllSelectedClasses);
  }
  saveSubjects() {

  }
  constructor(private activatedRoute: ActivatedRoute, private store: Store<SubjectsStateModel>) { }
}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getAggregatedResult, createClassesWithStudents } from '../../ngrx/actions/sections.actions';
import { Store } from '@ngrx/store';
import { SectionsStateModel } from '../../models/sections-state.model';
import { Observable } from 'rxjs';
import { AggregateModel } from '../../models/aggregate.model';
import { selectAggregate } from '../../ngrx/selectors/classes.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'edu-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data
  aggregate: Observable<AggregateModel[]>;
  ngOnInit(): void {
    this.aggregate = this.store.select(selectAggregate)
    this.aggregate.subscribe(x => console.log('adsfadsfadsfasdf', x))

    this.store.dispatch(getAggregatedResult())
  }
  debug(student) {
    console.log(student.gender.toLowerCase())
  }
  create() {
    this.store.dispatch(createClassesWithStudents())
  }
  constructor(private activatedRoute: ActivatedRoute, private store: Store<SectionsStateModel>) { }
}

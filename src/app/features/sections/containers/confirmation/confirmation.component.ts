import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  getAggregatedResult,
  createClassesWithStudents
} from '../../ngrx/actions/sections.actions';
import { Store } from '@ngrx/store';
import { SectionsStateModel } from '../../models/sections-state.model';
import { Observable } from 'rxjs';
import { AggregateModel } from '../../models/aggregate.model';
import { selectAggregate } from '../../ngrx/selectors/classes.selectors';
import { map } from 'rxjs/operators';
import { SectionsModalState } from '../../models/sections-modal-state.model';
import { selectModalState } from '../../ngrx/selectors';

@Component({
  selector: 'edu-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data;
  aggregate: Observable<AggregateModel[]>;
  sectionsModalState: Observable<SectionsModalState>;
  ngOnInit(): void {
    this.sectionsModalState = this.store.select(selectModalState);
    this.aggregate = this.store.select(selectAggregate);
    this.aggregate.subscribe(console.log);
    this.store.dispatch(getAggregatedResult());
  }
  goToDashboard() {
    this.router.navigateByUrl('/dashboard');
  }
  goToCalendar() {
    this.router.navigateByUrl('/calendar/dates-of-academic-year');
  }
  create() {
    this.store.dispatch(createClassesWithStudents());
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<SectionsStateModel>,
    private router: Router
  ) {}
}

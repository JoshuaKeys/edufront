import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SubjectModel } from '../models/subject.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { SubjectsStateModel } from '../models/subjects-state.model';
import { tap, withLatestFrom, first, map, finalize } from 'rxjs/operators';
import { selectAllSubjects } from '../ngrx/selectors';
import { fetchAllSubjectsRequest, fetchAllSubjectsSuccess } from '../ngrx/actions';

@Injectable()
export class SubjectResolver implements Resolve<SubjectModel[]>{
  loading = false;
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store.pipe(
      withLatestFrom(this.store.select(selectAllSubjects)),
      map(([action, subjects]) => {
        if (!this.loading) {
          this.loading = true;
          if (!subjects.length) {
            this.store.dispatch(fetchAllSubjectsRequest());
            return;
          }
          console.log('Helloooooooo')
          return fetchAllSubjectsSuccess({ subjects });
        }
      }),
      first(),
      finalize(() => this.loading = false)
    )
  }
  constructor(private store: Store<SubjectsStateModel>) { }
}

import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceElementsFactory,
  EntityCollectionServiceBase,
  QueryParams,
  DefaultDataService,
  HttpUrlGenerator
} from '@ngrx/data';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IAcademicYear } from '../core/models/timetable';

@Injectable({
  providedIn: 'root'
})
export class AcademicYearDataService extends DefaultDataService<IAcademicYear> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('academicYear', http, httpUrlGenerator);
  }

  getWithQuery(params: QueryParams) {
    return super.getWithQuery(params).pipe(
      map((res: any) => {
        return res.content;
      })
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class AcademicYearService extends EntityCollectionServiceBase<
  IAcademicYear
> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('academicYear', serviceElementsFactory);
  }
}

import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceElementsFactory,
  EntityCollectionServiceBase,
  QueryParams,
  DefaultDataService,
  HttpUrlGenerator
} from '@ngrx/data';
import { ISectionModel } from '../shared/models/section.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IGenericSearchReponse } from '../shared/models/generic-search.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClassSectionDataService extends DefaultDataService<ISectionModel> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator
  ) {
    super('classSection', http, httpUrlGenerator);
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
export class ClassSectionService extends EntityCollectionServiceBase<
  ISectionModel
> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('classSection', serviceElementsFactory);
  }
}

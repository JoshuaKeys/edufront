import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { SubjectModel } from '../shared/models/subject.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectService extends EntityCollectionServiceBase<SubjectModel> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('subjects', serviceElementsFactory);
  }
}

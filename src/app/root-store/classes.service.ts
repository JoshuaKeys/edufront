import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceElementsFactory,
  EntityCollectionServiceBase,
  DefaultDataServiceConfig
} from '@ngrx/data';
import { ClassModel } from '../shared/models/class.model';

@Injectable({
  providedIn: 'root'
})
export class ClassesService extends EntityCollectionServiceBase<ClassModel> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('class', serviceElementsFactory);
  }
}

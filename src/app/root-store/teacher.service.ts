import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { StaffModel } from '../shared/models/staff.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherService extends EntityCollectionServiceBase<StaffModel> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('teachers', serviceElementsFactory);
  }
}

import { SectionsModalState } from './sections-modal-state.model';
import { EntityState } from '@ngrx/entity';
import { ClassesModel } from '../../../shared/models/classes-model';
import { SectionModel } from '../../../shared/models/section.model';
import { AggregateModel } from './aggregate.model';
import { ExtendedClassModel } from '../../subjects/models/extend-class.model';

export interface SectionsStateModel {
  sectionsModal: SectionsModalState;
  classes: EntityState<ClassesModel>;
  sections: SectionModel[];
  aggregate: AggregateModel[]
}

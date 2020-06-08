import { SectionsModalState } from './sections-modal-state.model';
import { EntityState } from '@ngrx/entity';
import { ClassesModel } from './classes-model';
import { SectionModel } from './section.model';
import { AggregateModel } from './aggregate.model';

export interface SectionsStateModel {
  sectionsModal: SectionsModalState;
  classes: EntityState<ClassesModel>;
  sections: SectionModel[];
  aggregate: AggregateModel[]
}

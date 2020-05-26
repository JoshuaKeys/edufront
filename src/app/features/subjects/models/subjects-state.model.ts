import { SubjectModalStateModel } from './subject-modal-state.model';
import { SubjectsSubState } from '../ngrx/reducers/subjects.reducer';
import { ClassModel } from 'src/app/shared/models/class.model';
import { EntityState } from '@ngrx/entity';

export interface SubjectsStateModel {
  modal: SubjectModalStateModel,
  subjects: SubjectsSubState,
  classes: EntityState<ClassModel>
}
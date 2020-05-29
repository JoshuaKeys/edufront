import { EntityState } from '@ngrx/entity';
import { StaffModel } from './staff.model';
import { StaffsModalsModel } from './staffs-modal.model';
import { ClassModel } from 'src/app/shared/models/class.model';
import { SubjectModel } from 'src/app/shared/models/_subject.model';
import { SubjectClassesAssociation } from './subject-classes-association.model';
import { sortingReducer } from '../ngrx/reducers/sorting.reducer'
import { SortingModel } from './sorting-state.model';
export interface StaffsStateModel {
  staffsList: EntityState<StaffModel>;
  staffsModal: StaffsModalsModel;
  classes: EntityState<ClassModel>;
  subjects: EntityState<SubjectModel>;
  subjectClassesAssociation: SubjectClassesAssociation[],
  sorting: SortingModel
}

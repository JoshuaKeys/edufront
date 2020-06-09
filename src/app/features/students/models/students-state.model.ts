import { StudentsModalModel } from './students-modal.model';
import { StudentsSortingModel } from './students-sorting.model';
import { EntityState } from '@ngrx/entity';
import { StudentsXClassesModel } from './students-x-classes.model';
import { StudentModel } from '../../../shared/models/student.model';
import { ClassModel } from 'src/app/shared/models/class.model';
import { ProfileDTOModel } from '../../../shared/models/profile-dto.model';

export interface StudentsStateModel {
  studentsModal: StudentsModalModel,
  sorting: StudentsSortingModel,
  studentsAndClasses: EntityState<StudentsXClassesModel>,
  students: EntityState<StudentModel>,
  classes: EntityState<ClassModel>,
  edit: StudentModel
}

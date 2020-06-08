import { createAction, props } from '@ngrx/store';
import { StudentModel } from 'src/app/shared/models/student.model';
import { ExtendedProfileDTOModel } from '../../models/extended-profiledto.model';
import { ClassModel } from 'src/app/shared/models/class.model';
import { ClassesModel } from '../../models/classes-model';
import { SectionModel } from '../../models/section.model';
import { AggregateModel } from '../../models/aggregate.model';
import { ClassesWithStudentsModel } from '../../models/classes-with-students.model';

export const initFirstSection = createAction(
  '[ClassesEffects] initFirstSection',
  props<{ classId: string }>()
);
export const addStudentToSection = createAction(
  '[CreateSectionsComponent] addStudentToSection',
  props<{ student: ExtendedProfileDTOModel, classId: string, sectionName: string }>()
);
export const removeStudentFromSection = createAction(
  '[CreateSectionsComponent] removeStudentFromSection',
  props<{ student: ExtendedProfileDTOModel, classId: string, sectionName: string }>()
);
export const addNewSection = createAction(
  '[ClassesEffects] addNewSection',
  props<{ classId: string }>()
);
export const assignStudentsRequest = createAction(
  '[CreateSectionsComponent] assignStudentsRequest',
  props<{ classId: string }>()
);
export const assignStudentsRandomly = createAction(
  '[SectionsEffects] assignStudentsRandomly',
  props<{ students: ExtendedProfileDTOModel[], classId: string }>()
);
export const getAggregatedResult = createAction(
  '[CreateSections] getAggregatedResult'
)
export const setAggregatedResult = createAction(
  '[SectionsEffects] setAggregatedResult',
  props<{ result: AggregateModel[] }>()
)
export const createClassesWithStudents = createAction(
  '[ConfirmationComponent] createClassesWithStudents'
);
export const createClassesWithStudentsSuccess = createAction(
  '[SectionsEffects] createClassesWithStudentsSuccess',
  props<{ response: ClassesWithStudentsModel[] }>()
)

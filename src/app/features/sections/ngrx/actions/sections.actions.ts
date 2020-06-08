import { createAction, props } from '@ngrx/store';
import { StudentModel } from 'src/app/shared/models/student.model';
import { ExtendedProfileDTOModel } from '../../models/extended-profiledto.model';

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

import { createAction, props } from '@ngrx/store';
import { ClassesModel } from '../../models/classes-model';
import { ProfileDTOModel } from 'src/app/shared/models/profile-dto.model';
import { ExtendedProfileDTOModel } from '../../models/extended-profiledto.model';

export const getAllClassesRequest = createAction(
  '[CreateSectionsComponent] getAllClassesRequest'
);
export const getAllClassesSuccess = createAction(
  '[SectionsEffects] getAllClassesSuccess',
  props<{ classes: ClassesModel[] }>()
);
export const toggleSelectedState = createAction(
  '[CreateSectionsComponent] toggleSelectedState',
  props<{ classGrade: string }>()
)
export const doNothing = createAction(
  '[SectionsEffects] doNothing'
);
export const setClassStudents = createAction(
  '[SectionsEffects] setClassStudents',
  props<{ classId: string, students: ExtendedProfileDTOModel[] }>()
)
export const toggleStudentsDraggedState = createAction(
  '[SectionsEffects] toggleStudentsDraggedState',
  props<{ student: ExtendedProfileDTOModel }>()
)

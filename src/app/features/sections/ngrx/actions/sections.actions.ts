import { createAction, props } from '@ngrx/store';
import { StudentModel } from 'src/app/shared/models/student.model';
import { ClassModel } from 'src/app/shared/models/class.model';
import { ClassesModel } from '../../../../shared/models/classes-model';
import { SectionModel } from '../../../../shared/models/section.model';
import { AggregateModel } from '../../models/aggregate.model';
import { ClassesWithStudentsModel } from '../../models/classes-with-students.model';
import { ExtendedProfileDTOModel } from 'src/app/shared/models/extended-profiledto.model';

export const autoAssignStudentsToSections = createAction(
  '[autoAssign] autoAssignStudentsToSections'
);
export const setSection = createAction(
  '[autoAssign] setSection',
  props<{ classId: string; sections: any }>()
);

export const setAllStudentDraggedState = createAction(
  '[autoAssign] setAllStudentDraggedState',
  props<{ classId: string; state: boolean }>()
);
export const initFirstSection = createAction(
  '[ClassesEffects] initFirstSection',
  props<{ classId: string }>()
);
export const addStudentToSection = createAction(
  '[CreateSectionsComponent] addStudentToSection',
  props<{
    student: ExtendedProfileDTOModel;
    classId: string;
    sectionName: string;
  }>()
);
export const removeStudentFromSection = createAction(
  '[CreateSectionsComponent] removeStudentFromSection',
  props<{
    student: ExtendedProfileDTOModel;
    classId: string;
    sectionName: string;
  }>()
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
  props<{ students: ExtendedProfileDTOModel[]; classId: string }>()
);
export const getAggregatedResult = createAction(
  '[CreateSections] getAggregatedResult'
);
export const setAggregatedResult = createAction(
  '[SectionsEffects] setAggregatedResult',
  props<{ result: AggregateModel[] }>()
);
export const createClassesWithStudents = createAction(
  '[ConfirmationComponent] createClassesWithStudents'
);
export const createClassesWithStudentsSuccess = createAction(
  '[SectionsEffects] createClassesWithStudentsSuccess',
  props<{ response: ClassesWithStudentsModel[] }>()
);
export const changeSectionNameRequest = createAction(
  '[SectionsEffects] changeSectionNameRequest',
  props<{ classId: string; sectionName: string; sectionNewName: string }>()
);
export const changeSectionName = createAction(
  '[SectionsEffects] changeSectionName'
);

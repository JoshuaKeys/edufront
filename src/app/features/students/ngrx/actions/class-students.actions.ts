import { createAction, props } from '@ngrx/store';
import { StudentsXClassesModel } from '../../models/students-x-classes.model';
import { StudentModel } from '../../../../shared/models/student.model';
import { ClassModel } from 'src/app/shared/models/class.model';
import { ProfileDTOModel } from '../../../../shared/models/profile-dto.model';

export const uploadStudentsViaExcel = createAction(
  '[StudentsShellComponent] upload students via excel',
  props<{ file: File }>()
);

export const uploadStudentsViaExcelSuccess = createAction(
  '[StudentsShellComponent] succeeded upload students via excel',
  props<{ students: any }>()
);

export const refreshStudentXClass = createAction(
  '[StudentsShellComponent] refreshStudentXClass'
);

export const insertStudents = createAction(
  '[StudentsShellComponent] insertStudents',
  props<{ students: any }>()
);
export const updateStudents = createAction(
  '[StudentsShellComponent] updateStudents',
  props<{ students: any }>()
);

export const uploadStudentsViaExcelError = createAction(
  '[StudentsShellComponent] error in upload students via excel',
  props<{ error: any }>()
);

export const initClassesAndStudentsRequest = createAction(
  '[StudentsShellComponent] initClassesAndStudentsRequest'
);
export const initClassesAndStudentsResponse = createAction(
  '[StudentsEffects] initClassesAndStudentsResponse',
  props<{ studentsXclasses: StudentsXClassesModel[] }>()
);
export const createStudentRequest = createAction(
  '[StudentsCreationComponent] createStudentRequest',
  props<{ student: StudentModel }>()
);
export const createStudentSuccess = createAction(
  '[StudentsEffects] createStudentSuccess',
  props<{ student: StudentModel }>()
);

export const fetchedClassesSuccess = createAction(
  '[StudentsEffects] fetchedClassesSuccess',
  props<{ classes: ClassModel[] }>()
);
export const fetchedStudentsSuccess = createAction(
  '[StudentsEffects] fetchedStudentsSuccess',
  props<{ students: StudentModel[] }>()
);
export const deleteStudentRequest = createAction(
  '[StudentsCreationComponent] deleteStudentRequest',
  props<{ student: StudentModel }>()
);
export const deleteStudentSuccess = createAction(
  '[StudentsEffects] deleteStudentSuccess',
  props<{ student: StudentModel }>()
);
export const editStudentRequest = createAction(
  '[StudentsCreationComponent] editStudentRequest',
  props<{ student: StudentModel }>()
);
export const editStudentResponse = createAction(
  '[StudentsCreationComponent] editStudentResponse',
  props<{ student: StudentModel }>()
);
export const fetchStudentByIdRequest = createAction(
  '[StudentsCreationComponent] fetchStudentByIdRequest',
  props<{ student: StudentModel }>()
);
export const fetchStudentByIdResponse = createAction(
  '[StudentsEffect] fetchStudentByIdResponse',
  props<{ student: StudentModel }>()
);

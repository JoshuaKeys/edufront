import { createAction, props } from '@ngrx/store';
import {
  TimetableSkeleton,
  IClassSectionPeriodModel,
  ITimetableSavingModel
} from 'src/app/core/models/timetable';
import { GetClassesResponseModel } from 'src/app/shared/models/get-classes-response.model';
import {
  SubjectModel,
  ISubjectWithTeachers,
  ITeacher
} from 'src/app/shared/models/subject.model';

export enum ActionTypes {
  INIT_TIMETABLE = '[TIMETABLE] INIT TIMETABLE',
  GET_DAY_PLANNER = '[TIMETABLE] Get day planner',
  GET_DAY_PLANNER_SUCCESS = '[TIMETABLE] Get day planner success',
  GET_DAY_PLANNER_FAILURE = '[TIMETABLE] Get day planner failure',

  GET_CLASSES = '[TIMETABLE] Get classes',
  GET_CLASSES_SUCCESS = '[TIMETABLE] Get classes success',
  GET_CLASSES_FAILURE = '[TIMETABLE] Get classes failure',

  GET_SECTIONS = '[TIMETABLE] Get sections',
  GET_SECTIONS_SUCCESS = '[TIMETABLE] Get sections success',
  GET_SECTIONS_FAILURE = '[TIMETABLE] Get sections failure',

  GET_SUBJECTS = '[TIMETABLE] Get subjects',
  GET_SUBJECTS_SUCCESS = '[TIMETABLE] Get subjects success',
  GET_SUBJECTS_FAILURE = '[TIMETABLE] Get subjects failure',

  GET_TEACHERS = '[TIMETABLE] Get teachers',
  GET_TEACHERS_SUCCESS = '[TIMETABLE] Get teachers success',
  GET_TEACHERS_FAILURE = '[TIMETABLE] Get teachers failure',

  UPDATE_TIMETABLE_PERIOD = '[TIMETABLE] Update timetable period',

  SUBMIT_TIMETABLE = '[TIMETABLE] Submit timetable',
  SUBMIT_TIMETABLE_SUCCESS = '[TIMETABLE] Submit timetable success',
  SUBMIT_TIMETABLE_FAILURE = '[TIMETABLE] Submit timetable failure'
}

export const initTimetableAction = createAction(ActionTypes.INIT_TIMETABLE);

export const getDayPlannerAction = createAction(
  ActionTypes.GET_DAY_PLANNER,
  props<{ classId: string }>()
);
export const getDayPlannerSuccessAction = createAction(
  ActionTypes.GET_DAY_PLANNER_SUCCESS,
  props<{ res: TimetableSkeleton[] }>()
);
export const getDayPlannerFailureAction = createAction(
  ActionTypes.GET_DAY_PLANNER_FAILURE,
  props<{ error: any }>()
);

export const getClassesAction = createAction(ActionTypes.GET_CLASSES);
export const getClassesSuccessAction = createAction(
  ActionTypes.GET_CLASSES_SUCCESS,
  props<{ classes: GetClassesResponseModel[] }>()
);
export const getClassesFailureAction = createAction(
  ActionTypes.GET_CLASSES_FAILURE,
  props<{ error: any }>()
);

export const getSectionsAction = createAction(ActionTypes.GET_SECTIONS);
export const getSectionsSuccessAction = createAction(
  ActionTypes.GET_SECTIONS_SUCCESS,
  props<{ sections: any[] }>()
);
export const getSectionsFailureAction = createAction(
  ActionTypes.GET_SECTIONS_FAILURE,
  props<{ error: any }>()
);

export const getSubjectsAction = createAction(
  ActionTypes.GET_SUBJECTS,
  props<{ classId: string }>()
);
export const getSubjectsSuccessAction = createAction(
  ActionTypes.GET_SUBJECTS_SUCCESS,
  props<{ subjects: ISubjectWithTeachers[] }>()
);
export const getSubjectsFailureAction = createAction(
  ActionTypes.GET_SUBJECTS_FAILURE,
  props<{ error: any }>()
);

export const getTeachersAction = createAction(ActionTypes.GET_TEACHERS);
export const getTeachersSuccessAction = createAction(
  ActionTypes.GET_TEACHERS_SUCCESS,
  props<{ teachers: ITeacher[] }>()
);
export const getTeachersFailureAction = createAction(
  ActionTypes.GET_TEACHERS_FAILURE,
  props<{ error: any }>()
);

export const updateTimetablePeriodAction = createAction(
  ActionTypes.UPDATE_TIMETABLE_PERIOD,
  props<{
    classId: string;
    sectionId: string;
    periodId: string;
    period: any;
    data: any[];
    // subjectId: string;
    // teacherId: string;
  }>()
);

export const submitTimetableAction = createAction(
  ActionTypes.SUBMIT_TIMETABLE,
  props<{ timetable: ITimetableSavingModel[] }>()
);
export const submitTimetableSuccessAction = createAction(
  ActionTypes.SUBMIT_TIMETABLE_SUCCESS,
  props<{ timetable: ITimetableSavingModel[] }>()
);
export const submitTimetableFailureAction = createAction(
  ActionTypes.SUBMIT_TIMETABLE_FAILURE,
  props<{ error: any }>()
);

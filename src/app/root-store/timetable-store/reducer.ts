import { INITIAL_STATE } from './state';
import { createReducer, on } from '@ngrx/store';
import {
  getDayPlannerAction,
  getDayPlannerSuccessAction,
  getClassesAction,
  getClassesSuccessAction,
  getSubjectsAction,
  getSubjectsSuccessAction,
  getTeachersSuccessAction,
  updateTimetablePeriodAction,
  submitTimetableAction,
  submitTimetableSuccessAction,
  getSubjectsFailureAction,
  initTimetableAction
} from './actions';

export const timetableReducer = createReducer(
  INITIAL_STATE,
  on(initTimetableAction, state => INITIAL_STATE),
  on(getDayPlannerAction, state => ({
    ...state,
    ui: {
      ...state.ui,
      timetableSkeleton: {
        loading: true,
        error: null
      },
      submitted: false
    }
  })),
  on(getDayPlannerSuccessAction, (state, { res }) => ({
    ...state,
    timetableSkeleton: res || [],
    ui: {
      ...state.ui,
      timetableSkeleton: {
        loading: false,
        loaded: true,
        error: null
      }
    }
  })),
  on(getClassesAction, state => ({
    ...state,
    classes: null,
    ui: {
      ...state.ui,
      classes: {
        loading: true,
        loaded: false,
        error: null
      }
    }
  })),
  on(getClassesSuccessAction, (state, { classes }) => ({
    ...state,
    classes,
    ui: {
      ...state.ui,
      classes: {
        loading: false,
        loaded: true,
        error: null
      }
    }
  })),
  on(getSubjectsAction, state => ({
    ...state,
    ui: {
      ...state.ui,
      subjects: {
        loading: true,
        loaded: false,
        error: null
      }
    }
  })),
  on(getSubjectsSuccessAction, (state, { subjects }) => ({
    ...state,
    subjects,
    ui: {
      ...state.ui,
      subjects: {
        loading: false,
        loaded: true,
        error: null
      }
    }
  })),
  on(getSubjectsFailureAction, (state, { error }) => ({
    ...state,
    ui: {
      ...state.ui,
      subjects: {
        loading: false,
        loaded: false,
        error
      }
    }
  })),
  on(getTeachersSuccessAction, (state, { teachers }) => ({
    ...state,
    teachers
  })),
  on(updateTimetablePeriodAction, (state, data) => ({
    ...state,
    timetableData: {
      ...state.timetableData,
      [`${data.classId}--${data.sectionId}--${data.periodId}`]: {
        periodId: data.periodId,
        period: data.period,
        data: [...data.data]
      }
    }
  })),

  on(submitTimetableAction, state => ({
    ...state,
    ui: {
      ...state.ui,
      submitting: true
    }
  })),
  on(submitTimetableSuccessAction, state => ({
    ...state,
    ui: {
      ...state.ui,
      submitting: false,
      submitted: true
    }
  }))
);

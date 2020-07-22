import {
  createSelector,
  MemoizedSelector,
  createFeatureSelector
} from '@ngrx/store';
import { TimetableFeatureState } from './state';

const staffsFeature = createFeatureSelector<TimetableFeatureState>('timetable');

export const selectUi = createSelector(
  staffsFeature,
  timetable => timetable.ui
);

export const selectTimetableSkeleton = createSelector(
  staffsFeature,
  timetable => timetable.timetableSkeleton
);

export const selectTimetableSkeletonUI = createSelector(
  selectUi,
  ui => ui.timetableSkeleton
);

export const selectTeachers = createSelector(
  staffsFeature,
  timetable => timetable.teachers
);
export const selectSubjects = createSelector(
  staffsFeature,
  timetable => timetable.subjects
);

export const selectSubjectsUI = createSelector(selectUi, ui => ui.subjects);

export const selectTimetableData = createSelector(
  staffsFeature,
  timetable => timetable.timetableData
);

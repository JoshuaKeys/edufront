import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TimetableFeatureState } from './state';
import { IPeriodSavedData } from 'src/app/core/models/timetable';

const timetableFeature = createFeatureSelector<TimetableFeatureState>(
  'timetable'
);

export const selectUi = createSelector(
  timetableFeature,
  timetable => timetable.ui
);

export const selectTimetableSkeleton = createSelector(
  timetableFeature,
  timetable => timetable.timetableSkeleton
);

export const selectTimetableSkeletonUI = createSelector(
  selectUi,
  ui => ui.timetableSkeleton
);

export const selectTeachers = createSelector(
  timetableFeature,
  timetable => timetable.teachers
);
export const selectSubjects = createSelector(
  timetableFeature,
  timetable => timetable.subjects
);

export const selectSubjectsUI = createSelector(selectUi, ui => ui.subjects);

export const selectTimetableData = createSelector(
  timetableFeature,
  timetable => timetable.timetableData
);

export const selectTimetableAPIData = createSelector(
  timetableFeature,
  timetable => timetable.timetableAPIData
);

export const selectTimetableAPIDataByClass = createSelector(
  selectTimetableAPIData,
  (timetableAPIData: IPeriodSavedData[], props) =>
    timetableAPIData.filter(item => item.classId === props.classId)
);

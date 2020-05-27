import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EntityState } from '@ngrx/entity';
import { StaffModel } from '../../models/staff.model'
import * as fromStaffsList from '../reducers/staffs-list.reducer';
import * as fromClasses from '../reducers/classes.reducer';
import * as fromSubjects from '../reducers/subjects.reducer';
import { StaffsStateModel } from '../../models/staff-state.model';

const staffsFeature = createFeatureSelector<StaffsStateModel>('staffs');

const staffsList = createSelector(staffsFeature, feat => feat.staffsList)
const classesList = createSelector(staffsFeature, feat => feat.classes);
const subjectsList = createSelector(staffsFeature, feat => feat.subjects);

export const selectAllStaffs = createSelector(staffsList, fromStaffsList.selectAll);

export const selectStaffsModalsState = createSelector(staffsFeature, feat => feat.staffsModal)
export const selectAllClasses = createSelector(classesList, fromClasses.selectAll);
export const selectAllSubjects = createSelector(subjectsList, fromSubjects.selectAll)

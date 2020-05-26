import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EntityState } from '@ngrx/entity';
import { StaffModel } from '../../models/staff.model'
import { selectAll } from '../reducers/staffs-list.reducer';
import { StaffsStateModel } from '../../models/staff-state.model';

const staffsFeature = createFeatureSelector<StaffsStateModel>('staffs');

const staffsList = createSelector(staffsFeature, feat => feat.staffsList)
export const selectAllStaffs = createSelector(staffsList, selectAll);

export const selectStaffsModalsState = createSelector(staffsFeature, feat => feat.staffsModal)

import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EntityState } from '@ngrx/entity';
import { StaffModel } from '../../models/staff.model'
import { selectAll } from '../reducers';

const staffsFeature = createFeatureSelector<EntityState<StaffModel>>('staffs');

export const selectAllStaffs = createSelector(staffsFeature, selectAll);

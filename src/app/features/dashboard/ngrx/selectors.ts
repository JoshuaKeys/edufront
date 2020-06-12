import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DashboardStateModel } from '../models/dashboard-state.model';

const dashboardSelector = createFeatureSelector<DashboardStateModel>('dashboard');
export const selectDashboardState = createSelector(dashboardSelector, feat => feat)
export const selectModalState = createSelector(dashboardSelector, feat => feat.startModal)

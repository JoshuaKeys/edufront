import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthStateModel } from '../models/auth-state.model';

const authFeature = createFeatureSelector<AuthStateModel>('auth');

export const selectAuthToken = createSelector(authFeature, authState => authState.token);

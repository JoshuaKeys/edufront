import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthModel } from '../models/auth.model';

const authFeature = createFeatureSelector<AuthModel>('auth');

export const selectAuthToken = createSelector(authFeature, (authState) => authState ? authState.token : 'undefined');

import {ActionReducerMap} from '@ngrx/store';
import {routerReducer} from '@ngrx/router-store';
import {IAppState} from '../state/app.state';
import { schoolProfileReducer } from './school-profile.reducer';

export const appReducers: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  schoolProfile: schoolProfileReducer
};

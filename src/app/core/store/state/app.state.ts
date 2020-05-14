import {RouterReducerState} from '@ngrx/router-store';
import { SchoolProfileState } from './school-profile.state';

export interface IAppState {
  schoolProfile?: SchoolProfileState,
  router?: RouterReducerState;
}

export const initialAppState: IAppState = {
  schoolProfile: null
};

import { createReducer, on } from '@ngrx/store';
import { DashboardStateModel } from '../../models/dashboard-state.model';
import { incrementProgress, selectUserModalState } from '../actions';
import { Router } from '@angular/router';
import { state } from '@angular/animations';

const initialState: DashboardStateModel = {
  activeNavIndex: 0,
  progress: 0,
  startModal: true
}
const _dashboardReducer = createReducer(initialState,
  on(incrementProgress, (state, action) => {
    const stateCopy: DashboardStateModel = JSON.parse(JSON.stringify(state));
    stateCopy.activeNavIndex += 1;
    stateCopy.progress += 10
    return stateCopy;
  }),
  on(selectUserModalState, (state, action) => {
    return {
      ...state,
      startModal: !state.startModal
    }
  })
)
export function dashboardReducer(state, action) {
  return _dashboardReducer(state, action)
}

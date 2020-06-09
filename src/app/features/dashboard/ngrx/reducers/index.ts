import { createReducer, on } from '@ngrx/store';
import { DashboardStateModel } from '../../models/dashboard-state.model';
import { incrementProgress } from '../actions';

const initialState: DashboardStateModel = {
  activeNavIndex: 0,
  progress: 0
}
const _dashboardReducer = createReducer(initialState,
  on(incrementProgress, (state, action) => {
    const stateCopy: DashboardStateModel = JSON.parse(JSON.stringify(state));
    stateCopy.activeNavIndex += 1;
    stateCopy.progress += 10
    return stateCopy;
  })
)
export function dashboardReducer(state, action) {
  return _dashboardReducer(state, action)
}

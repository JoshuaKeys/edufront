import { combineReducers } from "@ngrx/store";
import { staffsListReducer } from './staffs-list.reducer';
import staffsModalReducer from './staffs-modals.reducer';

export const staffsReducer = combineReducers({
  staffsList: staffsListReducer,
  staffsModal: staffsModalReducer
})

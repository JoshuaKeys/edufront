import { combineReducers } from '@ngrx/store';
import { sectionsModalReducer } from './sections-modal-reducer';

export const sectionsReducer = combineReducers({
  sectionsModal: sectionsModalReducer
})

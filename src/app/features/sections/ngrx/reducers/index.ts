import { combineReducers } from '@ngrx/store';
import { sectionsModalReducer } from './sections-modal-reducer';
import { classesReducer } from './classes-reducer';
import { sectionsReducer as _sectionsReducer } from './sections-reducer';
import { aggregateReducer } from './aggregate-reducer';
export const sectionsReducer = combineReducers({
  sectionsModal: sectionsModalReducer,
  classes: classesReducer,
  sections: _sectionsReducer,
  aggregate: aggregateReducer
})

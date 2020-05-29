import { createReducer, on } from '@ngrx/store';
import { SortingModel } from '../../models/sorting-state.model';
import { toggleSortByGender, toggleSortByAlphabet } from '../actions';

const initialState: SortingModel = {
  alphabetical: false,
  byGender: false
}
export const sortingReducer = createReducer(initialState,
  on(toggleSortByGender, (state, action) => ({
    alphabetical: false,
    byGender: !state.byGender
  })),
  on(toggleSortByAlphabet, (state, action) => ({
    byGender: false,
    alphabetical: !state.alphabetical
  }))
);

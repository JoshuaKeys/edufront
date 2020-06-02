import { createReducer, on } from '@ngrx/store';
import { toggleSortByGender, toggleSortByAlphabet } from '../actions';
import { StudentsSortingModel } from '../../models/students-sorting.model';
import { toggleSortyByClasses } from '../actions/students-sorting.actions';

const initialState: StudentsSortingModel = {
  alphabetical: false,
  byGender: false,
  byClasses: false
}
export const sortingReducer = createReducer(initialState,
  on(toggleSortByGender, (state, action) => ({
    alphabetical: false,
    byClasses: false,
    byGender: !state.byGender
  })),
  on(toggleSortByAlphabet, (state, action) => ({
    byGender: false,
    byClasses: false,
    alphabetical: !state.alphabetical
  })),
  on(toggleSortyByClasses, (state, action) => ({
    byGender: false,
    alphabetical: false,
    byClasses: !state.byClasses
  }))
);

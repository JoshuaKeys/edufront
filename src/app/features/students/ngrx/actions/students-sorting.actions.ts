import { createAction } from '@ngrx/store';

export const toggleSortByGender = createAction(
  '[StudentsCreationComponent] toggleSortByGender'
);
export const toggleSortByAlphabet = createAction(
  '[StudentsCreationComponent] toggleSortByAlphabet'
);
export const toggleSortyByClasses = createAction(
  '[StudentsCreationComponent] toggleSortyByClasses'
);

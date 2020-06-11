import { createAction } from '@ngrx/store';

export const toggleStartModal = createAction(
  '[StudentsCreationComponent] toggleStartModal'
);
export const toggleAddModal = createAction(
  '[StudentsCreationComponent] toggleAddModal'
)
export const toggleEditModal = createAction(
  '[StudentsCreationComponent] toggleEditModal'
)
export const toggleEndModal = createAction(
  '[StudentsCreationComponent] toggleEndModal'
)

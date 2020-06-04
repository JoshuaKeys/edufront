import { createAction, props } from '@ngrx/store';

export const toggleModal = createAction(
  '[CreateSectionsComponent] toggleModal',
  props<{ modal: 'startModal' | 'endModal' }>()
)

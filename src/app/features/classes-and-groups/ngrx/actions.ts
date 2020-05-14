import { createAction, props } from '@ngrx/store';

export const SetGroupOfClassesQty = createAction('[ClassesAndGroupComponent] SetGroupOfClassesQty', props<{ qty: number }>())
export const SetInputError = createAction('[ClassesAndGroupComponent] SetInputError', props<{ error: string, value: any }>());

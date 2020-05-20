import { createAction, props } from '@ngrx/store';
import { GetClassesResponseModel } from 'src/app/shared/models/get-classes-response.model';

export const getClassesRequest = createAction('[SubjectsShellComponent] getClassesRequest');
export const getClassesSuccess = createAction('[SubjectsEffects] getClassesSuccess', props<{ classes: GetClassesResponseModel[] }>());
export const getClassesFailure = createAction('[SubjectsEffects] getClassesFailure');

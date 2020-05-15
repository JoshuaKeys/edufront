import { createAction, props } from '@ngrx/store';
import { GetClassesResponseModel } from '../models/get-classes-response.model';

export const setGroupOfClassesQty = createAction('[ClassesAndGroupComponent] setGroupOfClassesQty', props<{ qty: number }>())
export const setInputError = createAction('[ClassesAndGroupComponent] setInputError', props<{ error: string, value: any }>());
export const getClassesRequest = createAction('[ClassesAndGroupsShellComponent] getClassesRequest');
export const getClassesSuccess = createAction('[ClassesAndGroupsEffects] getClassesSuccess', props<{ classes: GetClassesResponseModel[] }>());
export const getClassesFailure = createAction('[ClassesAndGroupsEffects] getClassesFailure');

// Class Toggle
export const toggleClass = createAction('[ClassComponent] toggleClass', props<{ name: string }>());

// Modals
export const openClassesAndGroupsModal = createAction('[ClassesInSchoolComponent] openModal');
export const closeClassesAndGroupsModal = createAction('[ClassesInSchoolComponent] closeModal');
export const openClassesAndGroupsEndModal = createAction('[CreateGroupsQuestionComponent] openClassesAndGroupsEndModal');
export const closeClassesAndGroupsEndModal = createAction('[CreateGroupsQuestionComponent] closeClassesAndGroupsEndModal');

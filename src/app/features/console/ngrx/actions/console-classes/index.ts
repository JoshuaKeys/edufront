import { createAction, props } from '@ngrx/store';
import { GeneratedGroupsModel } from '../../../models/generated-groups.model';
import { ExtendedClassModel } from 'src/app/features/subjects/models/extend-class.model';

export const fetchGeneratedGroups = createAction(
  '[ConsoleClassesAndGroupsComponent] fetchGeneratedGroups'
)
export const fetchGeneratedGroupsSuccess = createAction(
  '[ConsoleClassesEffects] fetchGeneratedGroupsSuccess',
  props<{ generatedGroups: GeneratedGroupsModel[] }>()
)
export const fetchAllClasses = createAction(
  '[ConsoleClassesAndGroupsComponent] fetchAllClasses'
)
export const fetchAllClassesSuccess = createAction(
  '[ConsoleClassesEffects] fetchAllClassesSuccess',
  props<{ classes: ExtendedClassModel[] }>()
)

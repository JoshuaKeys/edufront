import { createAction, props } from '@ngrx/store';
import { GetClassesResponseModel } from '../models/get-classes-response.model';
import { ClassesWithoutGroupsRequestModel } from '../models/classes-without-groups-request.model';
import { ClassesWithoutGroupResponseModel } from '../models/classes-without-groups-response.model';
import { ClassesWithGroupsResponseModel } from '../models/classes-with-group-response.model';

export const setGroupOfClassesQty = createAction('[ClassesAndGroupComponent] setGroupOfClassesQty', props<{ qty: number }>())
export const preserveGroupOfClassesQty = createAction('[ClassesAndGroupsEffects] preserveGroupOfClassesQty')
export const resetAllDraggedState = createAction('[ClassesAndGroupsEffects] resetAllDraggedState');
export const requestGroupsClassMap = createAction('[ClassesAndGroupsComponent] requestGroupsClassMap')
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


// GroupClassMappings
export const initializeGroupClassMap = createAction('[NameGroupsComponent] initializeGroupClassMap')
export const setDroppedState = createAction(
  '[NameGroupsComponent] setDroppedState',
  props<{ className: string }>()
);

export const addClassToGroup = createAction(
  '[NameGroupsComponent] addClassToGroup',
  props<{ className: string, groupName: string }>()
);

export const removeDroppedState = createAction(
  '[NameGroupsComponent] removeDroppedState',
  props<{ className: string }>()
);

export const removeClassFromGroup = createAction(
  '[NameGroupsComponent] removeClassFromGroup',
  props<{ className: string, groupName: string }>()
);

export const changeGroupName = createAction(
  '[GroupBoxComponent] changeGroupName',
  props<{ oldName: string, newName: string }>()
);

export const classesWithoutGroupsRequest = createAction(
  '[CreateGroupsQuestionComponent] classesWithoutGroupsRequest'
);

export const classesWithoutGroupsSuccess = createAction(
  '[CreateGroupsQuestionComponent] classesWithoutGroupsSuccess',
  props<{ responseData: ClassesWithoutGroupResponseModel }>()
);

export const sendClassesWithGroupsRequest = createAction(
  '[] sendClassesWithGroupsRequest'
);

export const sendClassesWithGroupsSuccess = createAction(
  '[] sendClassesWithGroupsSuccess',
  props<{ responseData: ClassesWithGroupsResponseModel }>()
);


// TODO: Add ClassesWithoutGroupsFailure

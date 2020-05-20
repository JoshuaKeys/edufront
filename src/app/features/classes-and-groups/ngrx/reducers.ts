import { createReducer, createFeatureSelector, on } from "@ngrx/store";
import { ClassesAndGroupsModel } from '../models/classes-and-group.model';
import * as fromActions from './actions';
import { ClassModel } from 'src/app/shared/models/class.model';


const initialState: ClassesAndGroupsModel = {
  groupsOfClassesNum: 0,
  modals: {
    startModal: true,
    endModal: false
  }
};


const _classesAndGroupsReducer = createReducer(initialState,
  on(fromActions.setGroupOfClassesQty, (state, action) => ({
    ...state,
    groupsOfClassesNum: action.qty

  })),
  on(fromActions.setInputError, (state, action) => ({
    ...state,
    inputError: {
      msg: action.error,
      value: action.value
    }
  })),
  on(fromActions.getClassesSuccess, (state, action) => ({
    ...state,
    classes: action.classes
  })),
  on(fromActions.toggleClass, (state, action) => {
    let classes = state.classes.map(_class => ({ ..._class }));
    classes = classes.map(item => {
      if (item.name === action.name) {
        item.selected = !item.selected;
        return item;
      }
      return item;
    });

    return {
      ...state,
      classes
    }
  }),
  on(fromActions.closeClassesAndGroupsModal, (state, action) => ({
    ...state,
    modals: {
      ...state.modals,
      startModal: false
    }
  })),
  on(fromActions.openClassesAndGroupsEndModal, (state, action) => ({
    ...state,
    modals: {
      ...state.modals,
      endModal: true
    }
  })),
  on(fromActions.initializeGroupClassMap, (state, action) => {
    let groupsClassesMap = createDefaultGroupsClassesMap(state);
    return {
      ...state,
      groupsClassesMap
    }
  }),
  on(fromActions.resetAllDraggedState, (state, action) => {
    const resettedClasses = resetDraggedState(state.classes)
    return {
      ...state,
      classes: resettedClasses
    }
  }),
  on(fromActions.setDroppedState, (state, action) => {
    const classIdx = state.classes.findIndex(classItem => classItem.name === action.className);
    const classStateCopy = state.classes.map(_class => ({ ..._class }));
    classStateCopy[classIdx].dragged = true;
    return {
      ...state,
      classes: [...classStateCopy]
    }
  }),
  on(fromActions.addClassToGroup, (state, action) => {
    const groupIdx = state.groupsClassesMap.findIndex(item => item.groupName === action.groupName);
    const classObj = state.classes.find(item => item.name === action.className);
    const groupClassesMapCopy = state.groupsClassesMap.map(group => ({ ...group }));
    groupClassesMapCopy[groupIdx] = {
      ...groupClassesMapCopy[groupIdx],
      classes: [...groupClassesMapCopy[groupIdx].classes, classObj]
    }
    return {
      ...state,
      groupsClassesMap: [...groupClassesMapCopy]
    }
  }),
  on(fromActions.removeDroppedState, (state, action) => {
    const classIdx = state.classes.findIndex(classItem => classItem.name === action.className);
    const classStateCopy = state.classes.map(_class => ({ ..._class }));
    classStateCopy[classIdx].dragged = false;
    return {
      ...state,
      classes: [...classStateCopy]
    }
  }),
  on(fromActions.removeClassFromGroup, (state, action) => {
    const groupIdx = state.groupsClassesMap.findIndex(item => item.groupName === action.groupName);
    const classIdx = state.groupsClassesMap[groupIdx].classes.findIndex(item => item.name === action.className);
    const groupClassesMapCopy = state.groupsClassesMap.map(group => ({ ...group }));
    const classesCopy = groupClassesMapCopy[groupIdx].classes.map(classItem => ({ ...classItem }))
    classesCopy.splice(classIdx, 1);
    groupClassesMapCopy[groupIdx].classes = classesCopy
    return {
      ...state,
      groupsClassesMap: [...groupClassesMapCopy]
    }
  }),
  on(fromActions.changeGroupName, (state, action) => {
    const groupIdx = state.groupsClassesMap.findIndex(item => item.groupName === action.oldName);
    const groupClassesMapCopy = state.groupsClassesMap.map(group => ({ ...group }));
    groupClassesMapCopy[groupIdx].groupName = action.newName;
    return {
      ...state,
      groupsClassesMap: [...groupClassesMapCopy]
    }
  })
);

export function classesAndGroupsReducer(state, action) {
  return _classesAndGroupsReducer(state, action);
}

function createDefaultGroupsClassesMap(state) {
  const numOfGroups = state.groupsOfClassesNum;
  const emptyArray = new Array(+numOfGroups)
  let groupsClassesMap = []
  for (let i = 0; i < emptyArray.length; i++) {
    groupsClassesMap.push(
      {
        groupName: `Name ${i + 1}`,
        classes: []
      })
  }
  return groupsClassesMap;
}

function resetDraggedState(classes: ClassModel[]) {
  const classesCopy = [...classes];
  console.log(Object.isFrozen(classesCopy[0]));
  const resetedClassesCopy = classesCopy.map(classItem => {
    const copiedClassItem = { ...classItem };
    delete copiedClassItem.dragged;
    return copiedClassItem;
  })
  return resetedClassesCopy;
}

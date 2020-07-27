import { createReducer, on } from "@ngrx/store";
import { GeneratedGroupsModel } from '../../../models/generated-groups.model';
import { fetchGeneratedGroupsSuccess, fetchAllClassesSuccess, deleteGroupSuccess, performDrop, createGroup, deleteLocalGroup, performInitialDrop, toggleSelectedState, fetchAllStudentsSuccess, fetchAllClassesForSectionsSuccess, fetchAllClassesForSubjectsSuccess, fetchAllSubjectsSuccess, toggleConsoleSubjectsClassSelectedState, removeFromSelectedConsoleSubjectsClasses, assignToSelectedConsoleSubjectsClasses } from '../../actions/console-classes/console-classes-groups.actions';
import { ConsoleClassesStateModel } from '../../../models/console-classes-state.model';
import { fetchSectionDataSuccess } from '../../actions/console-classes/console-sections.actions';


const initialState: ConsoleClassesStateModel = {
  classesAndGroups: {
    sections: {},
    subjects: {}
  }
}

export const consoleClassesReducer = createReducer(initialState,
  on(fetchAllClassesSuccess, (state, action) => {
    console.log(state);
    return {
      ...state,
      classes: action.classes,
      // classesAndGroups: {
      //   ...state.classesAndGroups,
      //   sections: {
      //     ...state.classesAndGroups.sections,
      //     classes: action.classes
      //   }
      // }
    }
  }),
  on(fetchGeneratedGroupsSuccess, (state, action) => {
    return {
      ...state,
      classesAndGroups: {
        groups: action.generatedGroups
      }
    }
  }),
  on(deleteGroupSuccess, (state, action) => {
    const updatedClassesAndGroups = state.classesAndGroups.groups.filter(group => group.id !== action.group.id);
    return {
      ...state,
      classesAndGroups: {
        groups: updatedClassesAndGroups
      }
    }
  }),
  on(deleteLocalGroup, (state, action) => {
    const updatedClassesAndGroups = state.classesAndGroups.groups.filter(group => group.groupName !== action.group.groupName);
    return {
      ...state,
      classesAndGroups: {
        groups: updatedClassesAndGroups
      }
    }
  }),
  on(performDrop, (state, action) => {
    const stateCopy: ConsoleClassesStateModel = JSON.parse(JSON.stringify(state));
    const groupIdx = stateCopy.classesAndGroups.groups.findIndex(group => group.id === action.group.id);

    const oldGroupIdx = stateCopy.classesAndGroups.groups.findIndex(group => group.id === action.droppedClass.classGroupId);
    const oldClassIdx = stateCopy.classesAndGroups.groups[oldGroupIdx].classes.findIndex(classItem => classItem.id === action.droppedClass.id);

    stateCopy.classesAndGroups.groups[oldGroupIdx].classes.splice(oldClassIdx, 1);
    stateCopy.classesAndGroups.groups[groupIdx].classes.push({ ...action.droppedClass, classGroupId: stateCopy.classesAndGroups.groups[groupIdx].id });
    return stateCopy;
  }),
  on(performInitialDrop, (state, action) => {
    const stateCopy: ConsoleClassesStateModel = JSON.parse(JSON.stringify(state));
    const groupIdx = stateCopy.classesAndGroups.groups.findIndex(group => {
      if (action.group.id) {
        return group.id === action.group.id
      } else {
        return group.groupName === action.group.groupName
      }
    });
    const classIdx = stateCopy.classes.findIndex(classItem => classItem.id === action.droppedClass.id);
    stateCopy.classes[classIdx].selected = true;
    stateCopy.classes[classIdx].dragged = true;
    stateCopy.classesAndGroups.groups[groupIdx].classes.push({ ...action.droppedClass })
    return stateCopy;
  }),
  on(createGroup, (state, action) => {
    const stateCopy: ConsoleClassesStateModel = JSON.parse(JSON.stringify(state));
    const newGroup: GeneratedGroupsModel = {
      groupName: `Default Group ${stateCopy.classesAndGroups.groups.length + 1}`,
      classes: []
    }
    stateCopy.classesAndGroups.groups.push(newGroup);
    return stateCopy;
  }),
  on(fetchSectionDataSuccess, (state, action) => {
    return {
      ...state,
      classesAndGroups: {
        ...state.classesAndGroups,
        sections: {
          ...state.classesAndGroups.sections,
          aggregate: action.sections,
          unalteredAggregate: action.sections
        }
      }
    }
  }),
  on(fetchAllStudentsSuccess, (state, action) => {
    return {
      ...state,
      classesAndGroups: {
        ...state.classesAndGroups,
        sections: {
          ...state.classesAndGroups.sections,
          students: action.students
        }
      }
    }
  }),
  on(fetchAllClassesForSectionsSuccess, (state, action) => {
    return {
      ...state,
      classesAndGroups: {
        ...state.classesAndGroups,
        sections: {
          ...state.classesAndGroups.sections,
          classes: action.classes
        }
      }
    }
  }),
  on(fetchAllClassesForSubjectsSuccess, (state, action) => {
    return {
      ...state,
      classesAndGroups: {
        ...state.classesAndGroups,
        subjects: {
          ...state.classesAndGroups.subjects,
          classes: action.classes
        }
      }
    }
  }),
  on(toggleSelectedState, (state, action) => {
    const stateCopy: ConsoleClassesStateModel = JSON.parse(JSON.stringify(state));
    const classIdx = stateCopy.classesAndGroups.sections.classes.findIndex(classItem => classItem.name === action.classGrade);
    let updatedClasses = stateCopy.classesAndGroups.sections.classes.map(classItem => {
      classItem.selected = false
      return classItem;
    })
    stateCopy.classesAndGroups.sections.classes = updatedClasses;
    stateCopy.classesAndGroups.sections.classes[classIdx].selected = !stateCopy.classesAndGroups.sections.classes[classIdx].selected;
    return stateCopy;
  }),
  on(toggleConsoleSubjectsClassSelectedState, (state, action) => {
    const stateCopy: ConsoleClassesStateModel = JSON.parse(JSON.stringify(state));
    const classIdx = stateCopy.classesAndGroups.subjects.classes.findIndex(classItem => classItem.id === action.classId);
    console.log(stateCopy.classesAndGroups.subjects.classes, action)
    stateCopy.classesAndGroups.subjects.classes[classIdx].selected = !stateCopy.classesAndGroups.subjects.classes[classIdx].selected;
    return stateCopy;
  }),
  on(fetchAllSubjectsSuccess, (state, action) => {
    const stateCopy: ConsoleClassesStateModel = JSON.parse(JSON.stringify(state));
    stateCopy.classesAndGroups.subjects = {
      ...stateCopy.classesAndGroups.subjects,
      subjects: action.subjects
    }
    return stateCopy;
  }),
  on(removeFromSelectedConsoleSubjectsClasses, (state, action) => {
    const stateCopy: ConsoleClassesStateModel = JSON.parse(JSON.stringify(state));
    for (let i = 0; i < action.selectedClasses.length; i++) {
      const classIdx = stateCopy.classesAndGroups.subjects.classes.findIndex(classItem => action.selectedClasses[i].id === classItem.id);
      const subjectIdx = stateCopy.classesAndGroups.subjects.classes[classIdx].subjects.findIndex(subject => subject.id === action.subject.id);
      stateCopy.classesAndGroups.subjects.classes[classIdx].subjects.splice(subjectIdx, 1);
    }
    return stateCopy;
  }),
  on(assignToSelectedConsoleSubjectsClasses, (state, action) => {
    const stateCopy: ConsoleClassesStateModel = JSON.parse(JSON.stringify(state));
    for (let i = 0; i < action.selectedClasses.length; i++) {
      const classIdx = stateCopy.classesAndGroups.subjects.classes.findIndex(classItem => action.selectedClasses[i].id === classItem.id);
      // const subjectIdx = stateCopy.classesAndGroups.subjects.classes[classIdx].subjects.findIndex(subject => subject.id === action.subject.id);
      const alreadyHasSubject = stateCopy.classesAndGroups.subjects.classes[classIdx].subjects.find(subject => subject.id === action.subject.id);
      if (!alreadyHasSubject) {
        stateCopy.classesAndGroups.subjects.classes[classIdx].subjects.push(action.subject);
      }

    }
    return stateCopy;
  })
);

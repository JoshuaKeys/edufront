import { createReducer, on } from "@ngrx/store";
import { GeneratedGroupsModel } from '../../../models/generated-groups.model';
import { fetchGeneratedGroupsSuccess, fetchAllClassesSuccess, deleteGroupSuccess, performDrop, createGroup, deleteLocalGroup, performInitialDrop, toggleSelectedState, fetchAllStudentsSuccess, fetchAllClassesForSectionsSuccess, fetchAllClassesForSubjectsSuccess, fetchAllSubjectsSuccess, toggleConsoleSubjectsClassSelectedState, removeFromSelectedConsoleSubjectsClasses, assignToSelectedConsoleSubjectsClasses, createSubjectFromConsoleSuccess, performSectionDrop, removeStudentsFromSection, addStudentToConsoleSection, addNewSectionToAggregate, createConsoleStudentSuccess, removeClassFromGroup, fetchAssignedClassesSuccess, deleteClassSuccess, addClassesSuccess, updateGroupName, updateSectionName } from '../../actions/console-classes/console-classes-groups.actions';
import { ConsoleClassesStateModel } from '../../../models/console-classes-state.model';
import { fetchSectionDataSuccess } from '../../actions/console-classes/console-sections.actions';
import { StaffModel } from 'src/app/shared/models/staff.model';
import { SectionModel } from 'src/app/shared/models/section.model';
import { mapAlphaToNumeric } from 'src/app/shared/utilities/utilities';
import { v4 as uuid44 } from 'uuid';
import { ClassGroupModel } from 'src/app/features/calender/models/class-group.model';

const initialState: ConsoleClassesStateModel = {
  classesAndGroups: {

  },
  sections: {},
  subjects: {}
}

export const consoleClassesReducer = createReducer(initialState,
  on(fetchAllClassesSuccess, (state, action) => {
    console.log(state);
    return {
      ...state,
      classes: action.classes,
    }
  }),
  on(fetchAssignedClassesSuccess, (state, action) => {
    return {
      ...state,
      classesAndGroups: {
        ...state.classesAndGroups,
        assignedClasses: action.classes
      }
    }
  }),
  on(addClassesSuccess, (state, action) => {
    const stateCopy: ConsoleClassesStateModel = JSON.parse(JSON.stringify(state));

    const assignedClasses = stateCopy.classesAndGroups.assignedClasses;
    assignedClasses.push(...action.classes);
    return {
      ...state,
      classesAndGroups: {
        ...state.classesAndGroups,
        assignedClasses
      }
    }
  }),
  on(fetchGeneratedGroupsSuccess, (state, action) => {
    const groupsCopy: GeneratedGroupsModel[] = JSON.parse(JSON.stringify(action.generatedGroups));
    let modifiedGroups = groupsCopy.map(group => {
      const modifiedClasses = group.classes.map(classItem => {
        classItem.dragged = true;
        classItem.selected = true;
        return classItem;
      })
      group.classes = modifiedClasses;
      return group;
    });
    return {
      ...state,
      classesAndGroups: {
        ...state.classesAndGroups,
        groups: modifiedGroups
      }
    }
  }),
  on(deleteGroupSuccess, (state, action) => {
    const updatedClassesAndGroups = state.classesAndGroups.groups.filter(group => group.id !== action.group.id);
    return {
      ...state,
      classesAndGroups: {
        ...state.classesAndGroups,
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
  on(deleteClassSuccess, (state, action) => {
    const stateCopy: ConsoleClassesStateModel = JSON.parse(JSON.stringify(state));
    const deletedClassIdx = stateCopy.classesAndGroups.assignedClasses.findIndex(classItem => classItem.id === action.classItem.id);
    stateCopy.classesAndGroups.assignedClasses.splice(deletedClassIdx, 1);

    let groupDeletedClassIdx;
    const groupIdx = stateCopy.classesAndGroups.groups.findIndex(groupItem => {
      groupDeletedClassIdx = groupItem.classes.findIndex(classItem => classItem.grade === action.classItem.grade);
      console.log(groupDeletedClassIdx, action.classItem.grade, groupItem.classes);
      if (groupDeletedClassIdx > -1) {
        return true;
      } else {
        return false;
      }
    })
    console.log(groupIdx);
    if (groupIdx > -1) {
      stateCopy.classesAndGroups.groups[groupIdx].classes.splice(groupDeletedClassIdx, 1);
    }

    return stateCopy;
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
    stateCopy.classes[classIdx].classGroupId = stateCopy.classesAndGroups.groups[groupIdx].id;
    stateCopy.classesAndGroups.groups[groupIdx].classes.push({ ...stateCopy.classes[classIdx] })
    return stateCopy;
  }),
  on(removeClassFromGroup, (state, action) => {
    const stateCopy: ConsoleClassesStateModel = JSON.parse(JSON.stringify(state));
    const groupIdx = stateCopy.classesAndGroups.groups.findIndex(group => {
      const classIdx = group.classes.findIndex(classItem => classItem.id === action.class.id);
      if (classIdx > -1) {
        return true
      }
    })
    if (stateCopy.classesAndGroups.groups[groupIdx]) {
      const classIdx = stateCopy.classesAndGroups.groups[groupIdx].classes.findIndex(classItem => classItem.id === action.class.id);
      stateCopy.classesAndGroups.groups[groupIdx].classes.splice(classIdx, 1);

      const classItemIdx = stateCopy.classes.findIndex(classItem => action.class.id === classItem.id);
      stateCopy.classes[classItemIdx].selected = false;
      stateCopy.classes[classItemIdx].dragged = false;
      return stateCopy;
    }
    return stateCopy;

  }),
  on(updateSectionName, (state, action) => {
    const stateCopy: ConsoleClassesStateModel = JSON.parse(JSON.stringify(state));
    const aggregateIdx = stateCopy.sections.aggregate.findIndex(aggregateItem => aggregateItem.classItem.id === action.classId);
    const sectionIdx = stateCopy.sections.aggregate[aggregateIdx].sections.findIndex(section => section.id === action.section.id);
    stateCopy.sections.aggregate[aggregateIdx].sections[sectionIdx].sectionName = action.newName;
    return stateCopy;
  }),
  on(updateGroupName, (state, action) => {
    const stateCopy: ConsoleClassesStateModel = JSON.parse(JSON.stringify(state));
    const groupIdx = stateCopy.classesAndGroups.groups.findIndex(group => group.id === action.group.id);
    stateCopy.classesAndGroups.groups[groupIdx].groupName = action.newGroupName;
    return stateCopy
  }),
  on(createGroup, (state, action) => {
    const stateCopy: ConsoleClassesStateModel = JSON.parse(JSON.stringify(state));
    // const newGroup: GeneratedGroupsModel = {
    //   groupName: `Default Group ${stateCopy.classesAndGroups.groups.length + 1}`,
    //   classes: []
    // }
    const groupCopy: ClassGroupModel = JSON.parse(JSON.stringify(action.group));
    groupCopy.classes = [];
    stateCopy.classesAndGroups.groups.push(groupCopy);
    return stateCopy;
  }),
  on(fetchSectionDataSuccess, (state, action) => {
    return {
      ...state,
      sections: {
        ...state.sections,
        aggregate: action.sections,
        unalteredAggregate: action.sections
      }
    }
  }),
  on(fetchAllStudentsSuccess, (state, action) => {
    return {
      ...state,
      sections: {
        ...state.sections,
        students: action.students
      }
    }
  }),
  on(fetchAllClassesForSectionsSuccess, (state, action) => {
    return {
      ...state,
      sections: {
        ...state.sections,
        classes: action.classes
      }
    }
  }),
  on(fetchAllClassesForSubjectsSuccess, (state, action) => {
    return {
      ...state,
      subjects: {
        ...state.subjects,
        classes: action.classes
      }
    }
  }),
  on(toggleSelectedState, (state, action) => {
    const stateCopy: ConsoleClassesStateModel = JSON.parse(JSON.stringify(state));
    const classIdx = stateCopy.sections.classes.findIndex(classItem => classItem.name === action.classGrade);
    let updatedClasses = stateCopy.sections.classes.map(classItem => {
      classItem.selected = false
      return classItem;
    })
    stateCopy.sections.classes = updatedClasses;
    stateCopy.sections.classes[classIdx].selected = !stateCopy.sections.classes[classIdx].selected;
    return stateCopy;
  }),
  on(toggleConsoleSubjectsClassSelectedState, (state, action) => {
    const stateCopy: ConsoleClassesStateModel = JSON.parse(JSON.stringify(state));
    const classIdx = stateCopy.subjects.classes.findIndex(classItem => classItem.id === action.classId);
    console.log(stateCopy.subjects.classes, action)
    stateCopy.subjects.classes[classIdx].selected = !stateCopy.subjects.classes[classIdx].selected;
    return stateCopy;
  }),
  on(fetchAllSubjectsSuccess, (state, action) => {
    const stateCopy: ConsoleClassesStateModel = JSON.parse(JSON.stringify(state));
    stateCopy.subjects = {
      ...stateCopy.subjects,
      subjects: action.subjects
    }
    return stateCopy;
  }),
  on(removeFromSelectedConsoleSubjectsClasses, (state, action) => {
    const stateCopy: ConsoleClassesStateModel = JSON.parse(JSON.stringify(state));
    for (let i = 0; i < action.selectedClasses.length; i++) {
      const classIdx = stateCopy.subjects.classes.findIndex(classItem => action.selectedClasses[i].id === classItem.id);
      const subjectIdx = stateCopy.subjects.classes[classIdx].subjects.findIndex(subject => subject.id === action.subject.id);
      stateCopy.subjects.classes[classIdx].subjects.splice(subjectIdx, 1);
    }
    return stateCopy;
  }),
  on(assignToSelectedConsoleSubjectsClasses, (state, action) => {
    const stateCopy: ConsoleClassesStateModel = JSON.parse(JSON.stringify(state));
    for (let i = 0; i < action.selectedClasses.length; i++) {
      const classIdx = stateCopy.subjects.classes.findIndex(classItem => action.selectedClasses[i].id === classItem.id);
      const alreadyHasSubject = stateCopy.subjects.classes[classIdx].subjects.find(subject => subject.id === action.subject.id);
      if (!alreadyHasSubject) {
        stateCopy.subjects.classes[classIdx].subjects.push(action.subject);
      }

    }
    return stateCopy;
  }),
  on(createSubjectFromConsoleSuccess, (state, action) => {
    const stateCopy: ConsoleClassesStateModel = JSON.parse(JSON.stringify(state));
    stateCopy.subjects.subjects.push(action.subject)
    return stateCopy;
  }),
  on(performSectionDrop, (state, action) => {
    const stateCopy: ConsoleClassesStateModel = JSON.parse(JSON.stringify(state));
    const newSectionId = action.draggedData.newSectionId;
    const oldSectionId = action.draggedData.student['sectionId'];
    const aggregateIdx = stateCopy.sections.aggregate.findIndex(aggregate => action.draggedData.classId === aggregate.classItem.id);
    const oldSectionIdx = stateCopy.sections.aggregate[aggregateIdx].sections.findIndex(section => section.id === oldSectionId);
    const studentIdx = stateCopy.sections.aggregate[aggregateIdx].sections[oldSectionIdx].students.findIndex(student =>
      student.id === action.draggedData.student.id
    )
    stateCopy.sections.aggregate[aggregateIdx].sections[oldSectionIdx].students.splice(studentIdx, 1);
    const newSectionIdx = stateCopy.sections.aggregate[aggregateIdx].sections.findIndex(section => section.id === newSectionId);
    const student: StaffModel = JSON.parse(JSON.stringify(action.draggedData.student));
    student.classId = stateCopy.sections.aggregate[aggregateIdx].classItem.id;
    student['sectionId'] = stateCopy.sections.aggregate[aggregateIdx].sections[newSectionIdx].id;
    stateCopy.sections.aggregate[aggregateIdx].sections[newSectionIdx].students.push(student);
    return stateCopy;
  }),
  on(removeStudentsFromSection, (state, action) => {
    if (!action.draggedData.sectionName) {
      return state;
    }
    const stateCopy: ConsoleClassesStateModel = JSON.parse(JSON.stringify(state));
    const oldSectionId = action.draggedData.student['sectionId'];
    const aggregateIdx = stateCopy.sections.aggregate.findIndex(aggregate => action.draggedData.classId === aggregate.classItem.id);
    const oldSectionIdx = stateCopy.sections.aggregate[aggregateIdx].sections.findIndex(section => section.id === oldSectionId);
    const studentIdx = stateCopy.sections.aggregate[aggregateIdx].sections[oldSectionIdx].students.findIndex(student =>
      student.id === action.draggedData.student.id
    )
    console.log(stateCopy.sections.aggregate[aggregateIdx].sections[oldSectionIdx].students[studentIdx])
    stateCopy.sections.aggregate[aggregateIdx].sections[oldSectionIdx].students.splice(studentIdx, 1);
    return stateCopy;
  }),
  on(addStudentToConsoleSection, (state, action) => {
    const stateCopy: ConsoleClassesStateModel = JSON.parse(JSON.stringify(state));
    const aggregateIdx = stateCopy.sections.aggregate.findIndex(aggregate => action.draggedData.student.classId == aggregate.classItem.id);
    const newSectionId = action.draggedData.newSectionId;
    console.log(aggregateIdx);
    const newSectionIdx = stateCopy.sections.aggregate[aggregateIdx].sections.findIndex(section => section.id === newSectionId);
    const student: StaffModel = JSON.parse(JSON.stringify(action.draggedData.student));
    console.log(newSectionIdx);
    student['sectionId'] = stateCopy.sections.aggregate[aggregateIdx].sections[newSectionIdx].id;
    stateCopy.sections.aggregate[aggregateIdx].sections[newSectionIdx].students.push(student);
    return stateCopy;
  }),
  on(addNewSectionToAggregate, (state, action) => {
    const stateCopy: ConsoleClassesStateModel = JSON.parse(JSON.stringify(state));
    const aggregateIdx = stateCopy.sections.aggregate.findIndex(aggregate => action.section.classId === aggregate.classItem.id);
    // const sectionName = mapAlphaToNumeric()[stateCopy.classesAndGroups.sections.aggregate[aggregateIdx].sections.length + 1].toUpperCase();
    // const id = uuid44();
    stateCopy.sections.aggregate[aggregateIdx].sections.push({ ...action.section, students: [] })
    return stateCopy;
  }),
  on(createConsoleStudentSuccess, (state, action) => {
    const stateCopy: ConsoleClassesStateModel = JSON.parse(JSON.stringify(state));
    const aggregateIdx = stateCopy.sections.aggregate.findIndex(aggregate => action.student.profileDto.classId === aggregate.classItem.id)
    const newStudent: StaffModel = {
      classId: action.student.profileDto.classId,
      contexts: [
        'STUDENT'
      ],
      email: action.student.guardianDetailsDto.email,
      firstName: action.student.profileDto.firstName,
      lastName: action.student.profileDto.lastName,
      gender: action.student.profileDto.gender,
      id: action.student.profileDto.id,
      isDeleted: null,
      login: null,
      middleName: action.student.profileDto.middleName,
      phone: action.student.guardianDetailsDto.phone,
      profileImage: action.student.profileDto.profileImage,
      roles: null,
      rollNumber: action.student.profileDto.rollNumber
    }
    stateCopy.sections.students.push(newStudent as StaffModel);
    return stateCopy;
  })
);

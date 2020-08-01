import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ConsoleClassesStateModel } from '../../../models/console-classes-state.model';
import { ExtendedClassModel } from 'src/app/features/subjects/models/extend-class.model';
import { StaffModel } from 'src/app/shared/models/staff.model';
import { SubjectModel } from 'src/app/shared/models/subject.model';

const consoleFeature = createFeatureSelector<{ consoleClasses: ConsoleClassesStateModel }>('console');

export const selectConsoleClasses = createSelector(consoleFeature,
  feat => {
    return feat.consoleClasses.classes ? feat.consoleClasses.classes.slice().sort((classA, classB) => classA.grade - classB.grade) : []
  }
)
export const selectConsoleAssignedClasses = createSelector(consoleFeature,
  feat => {
    return feat.consoleClasses.classesAndGroups && feat.consoleClasses.classesAndGroups.assignedClasses ? feat.consoleClasses.classesAndGroups.assignedClasses.slice().sort((classA, classB) => {
      return classA.grade - classB.grade
    }) : []
  })
export const selectConsoleGroups = createSelector(consoleFeature,
  feat => {
    const result = Object.keys(feat.consoleClasses.classesAndGroups).find(key => key === 'groups') ? feat.consoleClasses.classesAndGroups.groups : [];
    return result;
  }
)
export const selectAssignedClassesIntersection = createSelector(selectConsoleClasses, selectConsoleAssignedClasses,
  (systemClasses, assignedClasses) => {
    systemClasses = JSON.parse(JSON.stringify(systemClasses))
    let result: ExtendedClassModel[] = [];
    for (let i = 0; i < systemClasses.length; i++) {
      for (let j = 0; j < assignedClasses.length; j++) {
        if (systemClasses[i].grade === assignedClasses[j].grade) {
          systemClasses[i].selected = true;
        }
      }
      result.push(systemClasses[i]);
    }
    return result;
  }
)
export const selectConsoleSelectedClasses = createSelector(selectConsoleAssignedClasses, selectConsoleGroups, (classes, groups) => {
  const groupedClasses: ExtendedClassModel[] = [];
  groups.forEach(group => {
    groupedClasses.push(...group.classes);
  });
  const classesCopy = JSON.parse(JSON.stringify(classes))
  for (let i = 0; i < classesCopy.length; i++) {
    const isSelected = groupedClasses.find(classItem => classItem.grade === classesCopy[i].grade);
    if (isSelected) {
      classesCopy[i].dragged = true;
      classesCopy[i].selected = true;
      console.log(classesCopy[i])
    }
  }
  return classesCopy;
})
export const selectAggregatedSectionsData = createSelector(consoleFeature, feat => {
  let allKeys = Object.keys(feat.consoleClasses.sections);
  let hasKey = allKeys.find(key => key === 'aggregate');
  console.log(hasKey, allKeys)
  let result = feat.consoleClasses.classesAndGroups && hasKey ? feat.consoleClasses.sections.aggregate : [];
  console.log(feat.consoleClasses.sections.aggregate);
  return result.filter(aggregateItem => aggregateItem.students.length)
});
export const selectAggregateByClassId = createSelector(consoleFeature, feat => {
  const selectedClass = feat.consoleClasses.sections.classes ?
    feat.consoleClasses.sections.classes.find(classItem => classItem.selected) : undefined;
  if (!selectedClass) {
    return null;
  }
  const aggregate = feat.consoleClasses.classesAndGroups && feat.consoleClasses.sections ? feat.consoleClasses.sections.aggregate : [];
  console.log(feat);
  if (aggregate.length) {
    const aggregateData = aggregate.find(aggregateItem => aggregateItem.classItem.id === selectedClass.id);
    return aggregateData;
  }
  return null;
})
export const selectSelectedClassForSections = createSelector(consoleFeature, feat => {
  let result = feat.consoleClasses.classesAndGroups && feat.consoleClasses.sections &&
    feat.consoleClasses.sections.classes &&
    feat.consoleClasses.sections.classes.find(classItem => classItem.selected);
  console.log(result);
  return result;
});
export const selectAllClassesForSections = createSelector(consoleFeature, feat => {
  let result = feat.consoleClasses.classesAndGroups && feat.consoleClasses.sections &&
    feat.consoleClasses.sections.classes ?
    feat.consoleClasses.sections.classes : []
  return result.slice().sort((itemA, itemB) => itemA.grade - itemB.grade);
})
export const selectAllStudentsForSections = createSelector(consoleFeature, feat => {
  let result = feat.consoleClasses.sections.students;
  return result;
})
export const selectAllClassesForSubjects = createSelector(consoleFeature, feat => {
  let result = feat.consoleClasses.classesAndGroups && feat.consoleClasses.subjects &&
    feat.consoleClasses.subjects.classes ?
    feat.consoleClasses.subjects.classes : []
  return result.slice().sort((itemA, itemB) => itemA.grade - itemB.grade);
})
export const selectAllSubjectsForConsole = createSelector(consoleFeature, feat => {
  let result = feat.consoleClasses.classesAndGroups && Object.keys(feat.consoleClasses.subjects).find(key => key === 'subjects') ?
    feat.consoleClasses.subjects.subjects : [];
  return result;
})
export const selectAggregate = createSelector(consoleFeature, feat => {
  let result = feat.consoleClasses.sections ? feat.consoleClasses.sections.aggregate : [];
  return result;
})
export const selectNotDraggedStudents = createSelector(consoleFeature, feat => {
  const selectedClass = feat.consoleClasses.sections.classes.find(classItem => classItem.selected);
  const liveAggregate = feat.consoleClasses.sections.aggregate;
  const liveAggregateItem = liveAggregate.find(aggregateItem => aggregateItem.classItem.id === selectedClass.id);

  const defaultAggregate = feat.consoleClasses.sections.unalteredAggregate;
  const defaultAggregateItem = defaultAggregate.find(aggregateItem => aggregateItem.classItem.id === selectedClass.id);

  const defaultStudents: StaffModel[] = feat.consoleClasses.sections.students.filter(student => student.classId === selectedClass.id)
  const currentStudents: StaffModel[] = [];
  liveAggregateItem.sections.forEach(sectionItem => {
    currentStudents.push(...sectionItem.students);
  })
  const notDraggedStudents: StaffModel[] = [];
  for (let i = 0; i < defaultStudents.length; i++) {
    let isNotDeleted = currentStudents.find(studentItem => studentItem.id === defaultStudents[i].id);
    if (isNotDeleted) {
      continue;
    }
    else {
      notDraggedStudents.push(defaultStudents[i]);
    }
  }
  console.log(notDraggedStudents);
  return notDraggedStudents;
})
export const selectAllConsoleSubjectsClasses = createSelector(consoleFeature, (feat) => {
  return feat.consoleClasses.classesAndGroups &&
    feat.consoleClasses.subjects &&
    feat.consoleClasses.subjects.classes ?
    feat.consoleClasses.subjects.classes
      .slice()
      .sort((classA, classB) => classA.grade - classB.grade) : []
})
export const selectConsoleSubjectsSelectedClasses = createSelector(selectAllConsoleSubjectsClasses, (classes) => {
  const classesCopy: ExtendedClassModel[] = JSON.parse(JSON.stringify(classes))
  return classesCopy.filter(classItem => classItem.selected);
})
export const getConsoleCommonClasses = createSelector(selectConsoleSubjectsSelectedClasses, classes => {
  const subjects = classes.map(classItem => classItem.subjects ? classItem.subjects : [])
  const result = getIntersection(subjects);
  return result;
})

function getIntersection(arrayGroup: SubjectModel[][]) {
  return arrayGroup.reduce((accumulator, currentVal, currIndex) => {
    if (currIndex === 0) {
      return currentVal;
    }
    let newArray = [];
    for (let i = 0; i < currentVal.length; i++) {
      if (accumulator.find(item => currentVal[i].id === item.id)) {
        newArray.push(currentVal[i]);
      }
    }
    return newArray;
  }, []);
}


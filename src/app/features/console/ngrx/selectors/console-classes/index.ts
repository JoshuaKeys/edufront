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
export const selectConsoleGroups = createSelector(consoleFeature,
  feat => {
    const result = Object.keys(feat.consoleClasses.classesAndGroups).find(key => key === 'groups') ? feat.consoleClasses.classesAndGroups.groups : [];
    return result;
  }
)
export const selectConsoleSelectedClasses = createSelector(selectConsoleClasses, selectConsoleGroups, (classes, groups) => {
  const groupedClasses: ExtendedClassModel[] = [];
  groups.forEach(group => {
    groupedClasses.push(...group.classes);
  });
  const classesCopy = JSON.parse(JSON.stringify(classes))
  for (let i = 0; i < classesCopy.length; i++) {
    const isSelected = groupedClasses.find(classItem => classItem.id === classesCopy[i].id);
    if (isSelected) {
      classesCopy[i].dragged = true;
      classesCopy[i].selected = true;
    }
  }
  return classesCopy;
})
export const selectAggregatedSectionsData = createSelector(consoleFeature, feat => {
  return feat.consoleClasses.classesAndGroups && feat.consoleClasses.classesAndGroups.sections ? feat.consoleClasses.classesAndGroups.sections.aggregate : [];
});
export const selectAggregateByClassId = createSelector(consoleFeature, feat => {
  const selectedClass = feat.consoleClasses.classesAndGroups.sections.classes ?
    feat.consoleClasses.classesAndGroups.sections.classes.find(classItem => classItem.selected) : undefined;
  if (!selectedClass) {
    return null;
  }
  const aggregate = feat.consoleClasses.classesAndGroups && feat.consoleClasses.classesAndGroups.sections ? feat.consoleClasses.classesAndGroups.sections.aggregate : [];
  console.log(feat);
  if (aggregate.length) {
    const aggregateData = aggregate.find(aggregateItem => aggregateItem.classItem.id === selectedClass.id);
    return aggregateData;
  }
  return null;
})
export const selectSelectedClassForSections = createSelector(consoleFeature, feat => {
  let result = feat.consoleClasses.classesAndGroups && feat.consoleClasses.classesAndGroups.sections &&
    feat.consoleClasses.classesAndGroups.sections.classes &&
    feat.consoleClasses.classesAndGroups.sections.classes.find(classItem => classItem.selected);
  console.log(result);
  return result;
});
export const selectAllClassesForSections = createSelector(consoleFeature, feat => {
  let result = feat.consoleClasses.classesAndGroups && feat.consoleClasses.classesAndGroups.sections &&
    feat.consoleClasses.classesAndGroups.sections.classes ?
    feat.consoleClasses.classesAndGroups.sections.classes : []
  return result.slice().sort((itemA, itemB) => itemA.grade - itemB.grade);
})
export const selectAllStudentsForSections = createSelector(consoleFeature, feat => {
  let result = feat.consoleClasses.classesAndGroups.sections.students;
  return result;
})
export const selectAllClassesForSubjects = createSelector(consoleFeature, feat => {
  let result = feat.consoleClasses.classesAndGroups && feat.consoleClasses.classesAndGroups.subjects &&
    feat.consoleClasses.classesAndGroups.subjects.classes ?
    feat.consoleClasses.classesAndGroups.subjects.classes : []
  return result.slice().sort((itemA, itemB) => itemA.grade - itemB.grade);
})
export const selectAllSubjectsForConsole = createSelector(consoleFeature, feat => {
  let result = feat.consoleClasses.classesAndGroups && Object.keys(feat.consoleClasses.classesAndGroups.subjects).find(key => key === 'subjects') ?
    feat.consoleClasses.classesAndGroups.subjects.subjects : [];
  return result;
})
export const selectNotDraggedStudents = createSelector(consoleFeature, feat => {
  const unalteredAggregate = feat.consoleClasses.classesAndGroups.sections.unalteredAggregate;
  const liveAggregate = feat.consoleClasses.classesAndGroups.sections.aggregate;
  const selectedClass = feat.consoleClasses.classesAndGroups.sections.classes.find(classItem => classItem.selected);
  const unalteredAggregateItem = unalteredAggregate.find(aggregateItem => aggregateItem.classItem.id === selectedClass.id);
  const liveAggregateItem = liveAggregate.find(aggregateItem => aggregateItem.classItem.id === selectedClass.id);
  const defaultStudents: StaffModel[] = [];
  unalteredAggregateItem.sections.forEach(sectionItem => {
    defaultStudents.push(...sectionItem.students);
  });
  const currentStudents: StaffModel[] = [];
  liveAggregateItem.sections.forEach(sectionItem => {
    currentStudents.push(...sectionItem.students)
  })
  console.log(currentStudents, defaultStudents)
  const notDraggedStudents: StaffModel[] = [];
  for (let i = 0; i < defaultStudents.length; i++) {
    let isNotDeleted = currentStudents.find(studentItem => studentItem.id === defaultStudents[i].id);
    console.log(isNotDeleted);
    if (isNotDeleted) {
      continue;
    }
    else {
      console.log('wuuuut')
      notDraggedStudents.push(defaultStudents[i]);
    }
  }
  console.log(notDraggedStudents)
  return notDraggedStudents;
})
export const selectAllConsoleSubjectsClasses = createSelector(consoleFeature, (feat) => {
  return feat.consoleClasses.classesAndGroups &&
    feat.consoleClasses.classesAndGroups.subjects &&
    feat.consoleClasses.classesAndGroups.subjects.classes ?
    feat.consoleClasses.classesAndGroups.subjects.classes
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


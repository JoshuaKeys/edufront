import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SectionsStateModel } from '../../models/sections-state.model';
import { EntityState } from '@ngrx/entity';
import { selectAll } from '../reducers/classes-reducer';
import { ExtendedClassModel } from 'src/app/features/subjects/models/extend-class.model';
import { ClassesModel } from '../../models/classes-model';

const featureSelector = createFeatureSelector<SectionsStateModel>('sections')
const selectClassesEntity = createSelector(featureSelector, featSel => featSel ? featSel.classes : {
  ids: [],
  entities: []

});
export const selectAllClasses = createSelector(selectClassesEntity, selectAll);

export const selectSortedClasses = createSelector(selectAllClasses, classes => {

  return classes && classes.length > 0 ? classes.slice().sort((a, b) => {
    if (+a.class.name < +b.class.name) {
      return -1;
    }
    if (+a.class.name > +b.class.name) {
      return 1;
    }
    return 0;

  }) : []
});
export const selectSelectedClass = createSelector(selectAllClasses, classes => {
  return classes.find(classItem => classItem.class.selected);
});
export const selectDraggedStudents = createSelector(selectAllClasses, classes => {
  const selectedClass = selectSelectedClass(selectAllClasses);
  const classNeeded = classes.findIndex(classItem => classItem.class.id === selectedClass.class.id);

  return classes[classNeeded].students.filter(student => student.dragged);
});
export const selectNotDraggedStudents = createSelector(selectAllClasses, classes => {

  const selectedClass = classes.find(classItem => classItem.class.selected);
  if (!selectedClass) {
    return [];
  }
  const classNeeded = classes.findIndex(classItem => classItem.class && classItem.class.id === selectedClass.class.id);
  return classes[classNeeded].students ? classes[classNeeded].students.filter(student => !student.dragged) : [];
});
export const selectSections = createSelector(featureSelector, selectAllClasses, (feat, classes) => {
  const selectedClass = classes.find(classItem => classItem.class.selected);
  const sectionIdx = feat.sections.findIndex(section => section.classId === selectedClass.class.id);
  return sectionIdx > -1 ? feat.sections[sectionIdx] : null;
});
export const selectAllSections = createSelector(featureSelector, feat => {
  return feat.sections;
});
export const selectCreateSectionData = createSelector(selectAllSections, sections => {
  const mappedSections = sections.map(sectionItem => {
    const classId = sectionItem.classId;
    let sectionName = '';
    let studentIds = []
    const sections = sectionItem.sections.forEach(section => {
      sectionName = section.sectionName;
      const _studentIds = section.subjects.map(student => student.id)
      studentIds = _studentIds
    })
    return { classId, sectionName, students: studentIds }
  })
  return mappedSections;
})
export const selectAggregate = createSelector(featureSelector, feat => {

  return feat.aggregate ? feat.aggregate : []
})

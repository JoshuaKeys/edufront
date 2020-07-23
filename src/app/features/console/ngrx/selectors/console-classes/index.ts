import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ConsoleClassesStateModel } from '../../../models/console-classes-state.model';

const consoleFeature = createFeatureSelector<{ consoleClasses: ConsoleClassesStateModel }>('console');

export const selectConsoleClasses = createSelector(consoleFeature,
  feat => {
    return feat.consoleClasses.classes ? feat.consoleClasses.classes.slice().sort((classA, classB) => classA.grade - classB.grade) : []
  }
)
export const selectConsoleGroups = createSelector(consoleFeature,
  feat => {
    return feat.consoleClasses.classesAndGroups ? feat.consoleClasses.classesAndGroups.groups : []
  }
)

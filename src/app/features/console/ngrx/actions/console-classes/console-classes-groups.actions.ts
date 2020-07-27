import { createAction, props } from '@ngrx/store';
import { GeneratedGroupsModel } from '../../../models/generated-groups.model';
import { ExtendedClassModel } from 'src/app/features/subjects/models/extend-class.model';
import { StaffModel } from 'src/app/shared/models/staff.model';
import { ISubjectWithTeachers, SubjectModel } from 'src/app/shared/models/subject.model';

export const fetchGeneratedGroups = createAction(
  '[ConsoleClassesAndGroupsComponent] fetchGeneratedGroups'
)
export const fetchGeneratedGroupsSuccess = createAction(
  '[ConsoleClassesEffects] fetchGeneratedGroupsSuccess',
  props<{ generatedGroups: GeneratedGroupsModel[] }>()
)
export const fetchAllClasses = createAction(
  '[ConsoleClassesAndGroupsComponent] fetchAllClasses'
);
export const fetchAllClassesSuccess = createAction(
  '[ConsoleClassesEffects] fetchAllClassesSuccess',
  props<{ classes: ExtendedClassModel[] }>()
);
export const deleteGroup = createAction(
  '[ConsoleClassesAndGroupsComponent] deleteGroup',
  props<{ group: GeneratedGroupsModel }>()
);
export const deleteLocalGroup = createAction(
  '[ConsoleClassesAndGroupsComponent] deleteLocalGroup',
  props<{ group: GeneratedGroupsModel }>()
);
export const deleteGroupSuccess = createAction(
  '[ConsoleClassesEffects] deleteGroupSuccess',
  props<{ group: GeneratedGroupsModel }>()
);
export const performDrop = createAction(
  '[ConsoleClassesAndGroupsComponent] performDrop',
  props<{ group: GeneratedGroupsModel, droppedClass: ExtendedClassModel }>()
);
export const performInitialDrop = createAction(
  '[ConsoleClassesAndGroupsComponent] performInitialDrop',
  props<{ group: GeneratedGroupsModel, droppedClass: ExtendedClassModel }>()
);
export const deleteClass = createAction(
  '[ConsoleClassesAndGroupsComponent] deleteClasses',
  props<{ class: ExtendedClassModel }>()
);
export const deleteClassSuccess = createAction(
  '[ConsoleClassesEffects] deleteClassSuccess',
  props<{ classItem: ExtendedClassModel }>()
);
export const addClasses = createAction(
  '[ConsoleClassesAndGroupsComponent] addClasses',
  props<{ classes: ExtendedClassModel[] }>()
);
export const createGroup = createAction(
  '[ConsoleClassesAndGroupsComponent] createGroup'
);
export const toggleSelectedState = createAction(
  '[ConsoleSectionEditComponent] toggleSelectedState',
  props<{ classGrade: string }>()
)
export const fetchAllStudents = createAction(
  '[ConsoleSectionEditComponent] fetchAllStudents'
);
export const fetchAllStudentsSuccess = createAction(
  '[ConsoleClassesEffects] fetchAllStudentsSuccess',
  props<{ students: StaffModel[] }>()
)
export const fetchAllClassesForSections = createAction(
  '[ConsoleSectionEditComponent] fetchAllClassesForSections'
)
export const fetchAllClassesForSectionsSuccess = createAction(
  '[ConsoleClasses] fetchAllClassesForSectionsSuccess',
  props<{ classes: ExtendedClassModel[] }>()
)
export const fetchAllClassesForSubjects = createAction(
  '[ConsoleSubjectsComponent] fetchAllClassesForSubjects'
)
export const fetchAllClassesForSubjectsSuccess = createAction(
  '[ConsoleClassesEffects] fetchAllClassesForSubjectsSuccess',
  props<{ classes: ExtendedClassModel[] }>()
);
export const fetchAllSubjects = createAction(
  '[ConsoleSubjectsComponent] fetchAllSubjects'
)
export const fetchAllSubjectsSuccess = createAction(
  '[ConsoleClassesEffects] fetchAllSubjectsSuccess',
  props<{ subjects: ISubjectWithTeachers[] }>()
);
export const fetchAllClassesWithSubjects = createAction(
  '[ConsoleClassesEffects] fetchAllClassesWithSubjects',
  props<{ classes: ExtendedClassModel[] }>()
)
export const fetchAllClassesWithSubjectsSuccess = createAction(
  '[ConsoleClassesEffects] fetchAllClassesWithSubjectsSuccess',
  props<{ classes: ExtendedClassModel[] }>()
)
export const toggleConsoleSubjectsClassSelectedState = createAction(
  '[ConsoleSubjectsComponent] toggleConsoleSubjectsClassSelectedState',
  props<{ classId: string }>()
);
export const removeFromSelectedConsoleSubjectsClassesRequest = createAction(
  '[ConsoleSubjectsComponent] removeFromSelectedConsoleSubjectsClassesRequest',
  props<{ subject: SubjectModel }>()
)
export const removeFromSelectedConsoleSubjectsClasses = createAction(
  '[ConsoleClassesEffects] removeFromSelectedConsoleSubjectsClasses',
  props<{ selectedClasses: ExtendedClassModel[], subject: SubjectModel }>()
)
export const assignToSelectedConsoleSubjectsClassesRequest = createAction(
  '[ConsoleSubjectsComponent] assignToSelectedConsoleSubjectsClassesRequest',
  props<{ subject: SubjectModel }>()
)
export const assignToSelectedConsoleSubjectsClasses = createAction(
  '[ConsoleSubjectsComponent] assignToSelectedConsoleSubjectsClasses',
  props<{ selectedClasses: ExtendedClassModel[], subject: SubjectModel }>()
)

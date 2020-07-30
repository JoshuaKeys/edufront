import { createAction, props } from '@ngrx/store';
import { GeneratedGroupsModel } from '../../../models/generated-groups.model';
import { ExtendedClassModel } from 'src/app/features/subjects/models/extend-class.model';
import { StaffModel } from 'src/app/shared/models/staff.model';
import { ISubjectWithTeachers, SubjectModel } from 'src/app/shared/models/subject.model';
import { CreateSubjModel } from 'src/app/shared/models/create-subject.model';
import { SubjectCreationSuccessModel } from 'src/app/shared/models/subject-creation-success.model';
import { DraggedSectionModel } from 'src/app/shared/models/dragged-section.model';
import { StudentModel } from 'src/app/shared/models/student.model';
import { ClassGroupModel } from 'src/app/features/calender/models/class-group.model';
import { GroupWithClasses } from '../../../models/group-with-classes.model';

export const fetchGeneratedGroups = createAction(
  '[ConsoleClassesAndGroupsComponent] fetchGeneratedGroups'
);
export const fetchGeneratedGroupsSuccess = createAction(
  '[ConsoleClassesEffects] fetchGeneratedGroupsSuccess',
  props<{ generatedGroups: GeneratedGroupsModel[] }>()
);
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
export const addClassesSuccess = createAction(
  '[ConsoleClassesEffects] addClassesSuccess',
  props<{ classes: ExtendedClassModel[] }>()
)
export const toggleSelectedState = createAction(
  '[ConsoleSectionEditComponent] toggleSelectedState',
  props<{ classGrade: string }>()
);
export const fetchAllStudents = createAction(
  '[ConsoleSectionEditComponent] fetchAllStudents'
);
export const fetchAllStudentsSuccess = createAction(
  '[ConsoleClassesEffects] fetchAllStudentsSuccess',
  props<{ students: StaffModel[] }>()
);
export const fetchAllClassesForSections = createAction(
  '[ConsoleSectionEditComponent] fetchAllClassesForSections'
)
export const fetchAllClassesForSectionsSuccess = createAction(
  '[ConsoleClasses] fetchAllClassesForSectionsSuccess',
  props<{ classes: ExtendedClassModel[] }>()
);
export const fetchAllClassesForSubjects = createAction(
  '[ConsoleSubjectsComponent] fetchAllClassesForSubjects'
);
export const fetchAllClassesForSubjectsSuccess = createAction(
  '[ConsoleClassesEffects] fetchAllClassesForSubjectsSuccess',
  props<{ classes: ExtendedClassModel[] }>()
);
export const fetchAllSubjects = createAction(
  '[ConsoleSubjectsComponent] fetchAllSubjects'
);
export const fetchAllSubjectsSuccess = createAction(
  '[ConsoleClassesEffects] fetchAllSubjectsSuccess',
  props<{ subjects: ISubjectWithTeachers[] }>()
);
export const fetchAllClassesWithSubjects = createAction(
  '[ConsoleClassesEffects] fetchAllClassesWithSubjects',
  props<{ classes: ExtendedClassModel[] }>()
);
export const fetchAllClassesWithSubjectsSuccess = createAction(
  '[ConsoleClassesEffects] fetchAllClassesWithSubjectsSuccess',
  props<{ classes: ExtendedClassModel[] }>()
);
export const toggleConsoleSubjectsClassSelectedState = createAction(
  '[ConsoleSubjectsComponent] toggleConsoleSubjectsClassSelectedState',
  props<{ classId: string }>()
);
export const removeFromSelectedConsoleSubjectsClassesRequest = createAction(
  '[ConsoleSubjectsComponent] removeFromSelectedConsoleSubjectsClassesRequest',
  props<{ subject: SubjectModel }>()
);
export const removeFromSelectedConsoleSubjectsClasses = createAction(
  '[ConsoleClassesEffects] removeFromSelectedConsoleSubjectsClasses',
  props<{ selectedClasses: ExtendedClassModel[], subject: SubjectModel }>()
);
export const assignToSelectedConsoleSubjectsClassesRequest = createAction(
  '[ConsoleSubjectsComponent] assignToSelectedConsoleSubjectsClassesRequest',
  props<{ subject: SubjectModel }>()
);
export const assignToSelectedConsoleSubjectsClasses = createAction(
  '[ConsoleSubjectsComponent] assignToSelectedConsoleSubjectsClasses',
  props<{ selectedClasses: ExtendedClassModel[], subject: SubjectModel }>()
);
export const createSubjectRequestFromConsole = createAction(
  '[ConsoleSubjectsComponent] createSubjectRequestFromConsole',
  props<{ subject: CreateSubjModel }>()
);
export const createSubjectFromConsoleSuccess = createAction(
  '[ConsoleSubjectsComponent] createSubjectFromConsoleSuccess',
  props<{ subject: ISubjectWithTeachers }>()
);
export const performSectionDrop = createAction(
  '[ConsoleSectionEditComponent] performSectionDrop',
  props<{ draggedData: DraggedSectionModel }>()
);
export const removeStudentsFromSection = createAction(
  '[ConsoleSectionEditComponent] removeStudentsFromSection',
  props<{ draggedData: DraggedSectionModel }>()
);
export const addStudentToConsoleSection = createAction(
  '[ConsoleSectionEditComponent] addStudentToConsoleSection',
  props<{ draggedData: DraggedSectionModel }>()
);
export const createConsoleStudentRequest = createAction(
  '[ConsoleSectionEditComponent] createConsoleStudentRequest',
  props<{ student: StudentModel }>()
);
export const createConsoleStudentSuccess = createAction(
  '[ConsoleClassesEffects] createConsoleStudentSuccess',
  props<{ student: StudentModel }>()
);
export const removeClassFromGroup = createAction(
  '[ConsoleClassesEffects] removeClassFromGroup',
  props<{ class: ExtendedClassModel }>()
);
export const addNewSectionToAggregateRequest = createAction(
  '[ConsoleSectionEditComponent] addNewSectionToAggregateRequest',
  props<{ classId: string }>()
)
export const addNewSectionToAggregate = createAction(
  '[ConsoleSectionEditComponent] addNewSectionToAggregate',
  props<{ section: any }>()
);
export const fetchAssignedClasses = createAction(
  '[ConsoleClassesAndGroupsComponent] fetchAssignedClasses',
)
export const fetchAssignedClassesSuccess = createAction(
  '[ConsoleEffects] fetchAssignedClassesSuccess',
  props<{ classes: ExtendedClassModel[] }>()
)
export const createGroup = createAction(
  '[ConsoleClassesAndGroupsComponent] createGroup',
  props<{ group: ClassGroupModel }>()
);
export const createGroupRequest = createAction(
  '[ConsoleClassesAndGroupsComponent] createGroupRequest'
);
export const sendGroupsWithClasses = createAction(
  '[ConsoleClassesAndGroupsComponent] sendGroupsWithClasses',
  // props<{ groups: GroupWithClasses[] }>()
)
export const sendGroupsWithClassesSuccess = createAction(
  '[ConsoleClassesEffects] sendGroupsWithClassesSuccess',
  props<{ groups: ClassGroupModel[] }>()
)

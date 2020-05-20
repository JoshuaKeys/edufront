import { createAction, props } from '@ngrx/store';
import { SubjectModel } from '../../models/subject.model'
import { CreateSubjModel } from '../../models/create-subject.model';
import { SubjectCreationSuccessModel } from '../../models/subject-creation-success.model';
import { ClassModel } from 'src/app/shared/models/class.model';
import { PostClassSubjectModel } from '../../models/post-class-subject.model';
import { PostClassSubjectResponseModel } from '../../models/post-class-subject-response.model';
export const closeSubjectsStartModal = createAction(
  '[SubjectsTaughtQuestionComponent] closeSubjectsStartModal'
);

export const fetchAllSubjectsRequest = createAction(
  '[SubjectsResolver] fetchAllSubjectsRequest'
);
export const fetchAllSubjectsSuccess = createAction(
  '[SubjectsResolver] fetchAllSubjectsSuccess',
  props<{ subjects: SubjectModel[] }>()
)
export const createSubjectRequest = createAction(
  '[SubjectsTaughtComponent] createSubjectRequest',
  props<{ subject: CreateSubjModel }>()
)
export const createSubjectSuccess = createAction(
  '[SubjectsEffects] createSubjectsSuccess',
  props<{ subject: SubjectCreationSuccessModel }>()
)
export const assignToSelectedClassesRequest = createAction(
  '[AssignSubjectsQuestionComponent] assignSubjectToSelectedClasses',
  props<{ subject: SubjectModel }>()
)
export const assignToSelectedClasses = createAction(
  '[SubjectsEffects] assignSubjectToSelectedClasses',
  props<{ selectedSubClasses: ClassModel[], subject: SubjectModel }>()
)
export const assignToSelectedClassesFailure = createAction(
  '[SubjectsEffects] assignSubjectToSelectedClassesFailure'
)
export const postClassesSubjectsRequest = createAction(
  '[ConfirmationComponent] postClassesSubjects',
  props<{ classesSubject: PostClassSubjectModel[] }>()
)
export const postClassesSubjectsSuccess = createAction(
  '[SubjectsEffects] postClassesSubjectsSuccess',
  props<{ classesSubjects: PostClassSubjectResponseModel[] }>()
)
export const toggleFormModal = createAction(
  '[AssignSubjectsQuestionComponent] toggleFormModal'
)

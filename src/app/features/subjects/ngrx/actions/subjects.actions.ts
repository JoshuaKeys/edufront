import { createAction, props } from '@ngrx/store';
import { SubjectModel } from '../../models/subject.model'
import { CreateSubjModel } from '../../models/create-subject.model';
import { SubjectCreationSuccessModel } from '../../models/subject-creation-success.model';
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
export const assignSubjectToSelectedClasses = createAction(
  '[SubjectsBoxComponent] assignSubjectToSelectedClasses',
  props<{ subject: SubjectModel }>()
)

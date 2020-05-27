import { SubSubjectModel } from './sub-subject.model';

export interface CreateSubjModel {
  subSubjects: SubSubjectModel[],
  subjectIcon: string;
  teachersIds: string[];
  title: string;
}

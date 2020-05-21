import { CreateSubjModel } from './create-subject.model';
import { SubSubjectModel } from './sub-subject.model';

export interface SubjectCreationSuccessModel {
  subSubjects: SubSubjectModel[],
  subjectIcon: string;
  teachers: string[];
  id: string;
  title: string;
}

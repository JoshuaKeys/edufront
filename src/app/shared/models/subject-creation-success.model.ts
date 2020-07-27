import { CreateSubjModel } from './create-subject.model';
import { SubSubjectModel } from './sub-subject.model';
import { ITeacher } from './subject.model';

export interface SubjectCreationSuccessModel {
  subSubjects: SubSubjectModel[],
  subjectIcon: string;
  teachers: string[] | ITeacher[];
  id: string;
  title: string;
}

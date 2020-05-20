import { SubSubjectModel } from './sub-subject.model';

export interface SubjectModel {
  title: string;
  subjectIcon: string;
  subSubjects: SubSubjectModel[];
  id: string;
  teachers: string[]
}

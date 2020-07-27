import { SubjectModel } from './_subject.model';
import { ISubjectWithTeachers } from './subject.model';

export interface SelectableSubjectModel extends ISubjectWithTeachers {
  selected?: boolean;
}

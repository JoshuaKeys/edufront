import { SubjectModel } from './_subject.model';

export interface SelectableSubjectModel extends SubjectModel {
  selected?: boolean;
}

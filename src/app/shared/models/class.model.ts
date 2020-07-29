import { TeacherModel } from './teacher.model';
import { SubjectModel } from './subject.model';

export interface ClassModel {
  name: string;
  grade: number;
  classGroupId?: string;
  id?: string;
  teachers: TeacherModel[];
  subjects: SubjectModel[];
  selected?: boolean;
  dragged?: boolean;
}

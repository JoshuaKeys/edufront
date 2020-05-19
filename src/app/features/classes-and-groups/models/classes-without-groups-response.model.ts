import { TeacherModel } from './teacher.model';
import { SubjectModel } from './subject.model';

export interface ClassesWithoutGroupResponseModel {
  name: string;
  grade: string;
  classGroupId: string;
  id: string;
  teachers: TeacherModel[];
  subjects: SubjectModel[]
}

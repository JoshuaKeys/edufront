import { TeacherModel } from './teacher.model';
import { SubjectModel } from './subject.model';

export interface GetClassesResponseModel {
  name: string;
  grade: number;
  id: string;
  teachers: TeacherModel[],
  subjects: SubjectModel[]
}

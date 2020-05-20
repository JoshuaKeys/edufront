import { TeacherModel } from 'src/app/shared/models/teacher.model';
import { SubjectModel } from 'src/app/shared/models/subject.model';

export interface ClassesWithoutGroupResponseModel {
  name: string;
  grade: string;
  classGroupId: string;
  id: string;
  teachers: TeacherModel[];
  subjects: SubjectModel[]
}

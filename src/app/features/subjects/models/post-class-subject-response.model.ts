import { SubjectModel } from 'src/app/shared/models/subject.model';
import { TeacherModel } from 'src/app/shared/models/teacher.model';

export interface PostClassSubjectResponseModel {
  name: string;
  grade: number;
  classGroupId: string;
  id: string;
  teachers: TeacherModel[],
  subjects: SubjectModel[]
}

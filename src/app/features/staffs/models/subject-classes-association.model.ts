import { ClassModel } from 'src/app/shared/models/class.model';

export interface SubjectClassesAssociation {
  subjectId: string,
  classes: Array<ClassModel>
}

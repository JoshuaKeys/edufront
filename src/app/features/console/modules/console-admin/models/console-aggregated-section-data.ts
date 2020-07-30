import { StudentModel } from 'src/app/shared/models/student.model';
import { StaffModel } from 'src/app/shared/models/staff.model';
import { ExtendedClassModel } from 'src/app/features/subjects/models/extend-class.model';

export interface ConsoleAggregatedSectionData {
  classItem: ExtendedClassModel;
  id: string;
  sectionName: string;
  students: StaffModel[]
}

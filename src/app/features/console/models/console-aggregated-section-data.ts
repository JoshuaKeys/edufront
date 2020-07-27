import { ExtendedClassModel } from '../../subjects/models/extend-class.model';
import { StudentModel } from 'src/app/shared/models/student.model';
import { StaffModel } from 'src/app/shared/models/staff.model';

export interface ConsoleAggregatedSectionData {
  classItem: ExtendedClassModel;
  id: string;
  sectionName: string;
  students: StaffModel[]
}

import { StaffModel } from 'src/app/shared/models/staff.model';
import { ExtendedClassModel } from 'src/app/features/subjects/models/extend-class.model';

export interface AggregatedResult {
  classItem: ExtendedClassModel,
  sections: {
    id: string;
    sectionName: string;
    students: StaffModel[]
  }[],
  students: StaffModel[]
}

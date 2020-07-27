import { ExtendedClassModel } from '../../subjects/models/extend-class.model';
import { StaffModel } from 'src/app/shared/models/staff.model';

export interface AggregatedResult {
  classItem: ExtendedClassModel,
  sections: {
    id: string;
    sectionName: string;
    students: StaffModel[]
  }[]
}

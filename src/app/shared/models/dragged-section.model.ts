import { ExtendedProfileDTOModel } from 'src/app/shared/models/extended-profiledto.model';
import { StaffModel } from 'src/app/shared/models/staff.model';

export interface DraggedSectionModel {
  student: StaffModel;
  classId: string;
  sectionName?: string;
  newSectionId?: string;
}

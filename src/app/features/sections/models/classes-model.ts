import { ExtendedClassModel } from '../../subjects/models/extend-class.model';
import { StaffModel } from 'src/app/shared/models/staff.model';
import { ProfileDTOModel } from 'src/app/shared/models/profile-dto.model';
import { ExtendedProfileDTOModel } from './extended-profiledto.model';

export interface ClassesModel {
  class: ExtendedClassModel;
  students?: ExtendedProfileDTOModel[];
}

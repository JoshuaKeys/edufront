import { ProfileDTOModel } from './profile-dto.model';
import { GuardianDetailsDTOModel } from '../../features/students/models/guardian-details-dto.model';

export interface StudentModel {
  guardianDetailsDto?: GuardianDetailsDTOModel
  profileDto: ProfileDTOModel
}

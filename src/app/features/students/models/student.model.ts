import { ProfileDTOModel } from './profile-dto.model';
import { GuardianDetailsDTOModel } from './guardian-details-dto.model';

export interface StudentModel {
  guardianDetailsDto?: GuardianDetailsDTOModel
  profileDto: ProfileDTOModel
}

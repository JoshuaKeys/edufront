import { ProfileDTOModel } from 'src/app/shared/models/profile-dto.model';

export interface ExtendedProfileDTOModel extends ProfileDTOModel {
  dragged?: boolean;
}

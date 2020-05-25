import { PreviewModel } from './preview.model';
import { ProfileModel } from './profile.model';
import { ProfileModalModel } from './profile-modal.model';

export interface SchoolProfileModel {
  preview: PreviewModel[],
  profile: ProfileModel,
  modal: ProfileModalModel
}

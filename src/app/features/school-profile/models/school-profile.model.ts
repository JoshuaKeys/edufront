import { PreviewModel, SchoolPreviewModel } from './preview.model';
import { ProfileModel } from './profile.model';
import { ProfileModalModel } from './profile-modal.model';

export interface SchoolProfileModel {
  preview: SchoolPreviewModel,
  profile: ProfileModel,
  modal: ProfileModalModel
}

import { combineReducers } from '@ngrx/store';
import { schoolProfilePreviewReducer } from './school-profile-preview.reducer';
import { PreviewModel } from '../../models/preview.model';
import { SchoolProfileModel } from '../../models/school-profile.model';
import { profileReducer } from './school-profile.reducer';
import { profileModalReducer } from './school-profile-modal.reducer'

export const schoolProfileReducer = combineReducers<SchoolProfileModel>({
  preview: schoolProfilePreviewReducer,
  profile: profileReducer,
  modal: profileModalReducer
});

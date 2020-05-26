import { EntityState } from '@ngrx/entity';
import { StaffModel } from './staff.model';
import { StaffsModalsModel } from './staffs-modal.model';

export interface StaffsStateModel {
  staffsList: EntityState<StaffModel>,
  staffsModal: StaffsModalsModel
}

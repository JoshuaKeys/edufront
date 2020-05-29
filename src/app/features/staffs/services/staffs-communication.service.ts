import { Injectable } from "@angular/core";
import { Subject, Observable } from 'rxjs';
import { StaffModel } from '../models/staff.model';

@Injectable()
export class StaffsCommunicatorService {
  private _editStaff = new Subject<StaffModel>();
  private _removeStaff = new Subject<StaffModel>();

  staffEdition$ = this._editStaff.asObservable();
  staffRemoval$ = this._removeStaff.asObservable();

  editStaff(staff: StaffModel) {
    this._editStaff.next(staff);
  }
  removeStaff(staff: StaffModel) {
    this._removeStaff.next(staff);
  }
}

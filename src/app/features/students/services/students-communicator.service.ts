import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { StudentModel } from '../../../shared/models/student.model';

@Injectable()
export class StudentsCommunicatorService {
  private _editStaff = new Subject<StudentModel>();
  private _removeStaff = new Subject<StudentModel>();

  studentEdition$ = this._editStaff.asObservable();
  studentRemoval$ = this._removeStaff.asObservable();

  editStudent(student: StudentModel) {
    this._editStaff.next(student);
  }
  removeStudent(student: StudentModel) {
    this._removeStaff.next(student);
  }
}

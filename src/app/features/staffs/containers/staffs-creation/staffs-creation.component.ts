import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { StaffsService } from '../../services/staffs.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { EntityState } from '@ngrx/entity';
import { StaffModel } from '../../models/staff.model';
import { selectAllStaffs, selectStaffsModalsState, selectAllSubjects, selectAllClasses } from '../../ngrx/selectors';
import { Observable } from 'rxjs';
import { StaffsModalsModel } from '../../models/staffs-modal.model';
import { toggleAddEditModal } from '../../ngrx/actions';
import { SubjectModel } from 'src/app/shared/models/_subject.model';
import { ClassModel } from 'src/app/shared/models/class.model';

@Component({
  selector: 'edu-staffs-creation',
  templateUrl: './staffs-creation.component.html',
  styleUrls: ['./staffs-creation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffsCreationComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data;
  staffsModalsState: Observable<StaffsModalsModel>
  staffs: Observable<StaffModel[]>;
  subjects: Observable<SubjectModel[]>;
  classes: Observable<ClassModel[]>;
  ngOnInit(): void {
    this.staffs = this.store.select(selectAllStaffs);
    this.staffsModalsState = this.store.select(selectStaffsModalsState);
    this.subjects = this.store.select(selectAllSubjects);
    this.classes = this.store.select(selectAllClasses);
  }
  onEditStaff(staff: StaffModel) {
    this.store.dispatch(toggleAddEditModal());
  }
  onAddStaff() {
    this.store.dispatch(toggleAddEditModal());
  }
  constructor(private store: Store<EntityState<StaffModel>>, private activatedRoute: ActivatedRoute) { }
}

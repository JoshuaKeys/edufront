import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { StaffsService } from '../../services/staffs.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { EntityState } from '@ngrx/entity';
import { StaffModel } from '../../models/staff.model';
import { selectAllStaffs, selectStaffsModalsState } from '../../ngrx/selectors';
import { Observable } from 'rxjs';
import { StaffsModalsModel } from '../../models/staffs-modal.model';
import { toggleAddEditModal } from '../../ngrx/actions';

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

  ngOnInit(): void {
    this.staffs = this.store.select(selectAllStaffs)
    this.staffsModalsState = this.store.select(selectStaffsModalsState);
  }
  onAddOrEdit() {
    this.store.dispatch(toggleAddEditModal());
  }
  constructor(private store: Store<EntityState<StaffModel>>, private activatedRoute: ActivatedRoute) { }
}

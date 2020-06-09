import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassesAndGroupsModel } from '../../models/classes-and-group.model';
import { Store } from '@ngrx/store';
import { selectGroupsClassMap, selectModalState } from '../../ngrx/selectors';
import { GroupClassMapModel } from '../../models/group-class-map.model';
import { Observable } from 'rxjs';
import { ModalModel } from '../../models/modal.model';
import { openClassesAndGroupsEndModal, sendClassesWithGroupsRequest } from '../../ngrx/actions';

@Component({
  selector: 'edu-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationComponent implements OnInit {
  modalState: Observable<ModalModel>;
  groupClassMap: Observable<GroupClassMapModel[]>;
  activatedRouteData = this.activatedRoute.snapshot.data;

  ngOnInit(): void {
    this.modalState = this.store.select(selectModalState);
    this.groupClassMap = this.store.select(selectGroupsClassMap);
  }
  onModalBtnClicked() {
    this.store.dispatch(openClassesAndGroupsEndModal())
  }
  submit() {
    this.store.dispatch(sendClassesWithGroupsRequest())
  }
  goToSubjects() {
    this.router.navigate(['../', '/subjects/subjects-taught'], { relativeTo: this.activatedRoute })
  }
  goToDashboard() {
    this.router.navigate(['/dashboard'], { relativeTo: this.activatedRoute })
  }
  completeProcess() {

  }
  constructor(
    public store: Store<ClassesAndGroupsModel>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }
}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ClassesAndGroupsModel } from '../../models/classes-and-group.model';
import { selectSelectedClasses, selectModalState } from '../../ngrx/selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalModel } from '../../models/modal.model';
import { openClassesAndGroupsEndModal, classesWithoutGroupsRequest } from '../../ngrx/actions';
import { ClassModel } from 'src/app/shared/models/class.model';

@Component({
  selector: 'edu-create-groups-question',
  templateUrl: './create-groups-question.component.html',
  styleUrls: ['./create-groups-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateGroupsQuestionComponent implements OnInit {
  selectedClasses: Observable<ClassModel[]>
  activatedRouteData = this.activatedRoute.snapshot.data;
  modalState: Observable<ModalModel>;
  constructor(
    private store: Store<ClassesAndGroupsModel>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.selectedClasses = this.store.select(selectSelectedClasses);
    this.modalState = this.store.select(selectModalState)
  }
  openModal() {
    this.store.dispatch(openClassesAndGroupsEndModal())
  }
  submitWithoutGroups() {
    // this.openModal();
    this.store.dispatch(classesWithoutGroupsRequest())
  }
  goToSubjects() {
    this.router.navigate(['../', '/subjects/subjects-taught'], { relativeTo: this.activatedRoute })
  }
  goToDashboard() {

  }
}

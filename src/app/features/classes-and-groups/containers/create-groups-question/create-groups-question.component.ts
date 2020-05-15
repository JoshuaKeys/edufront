import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ClassModel } from '../../models/class.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ClassesAndGroupsModel } from '../../models/classes-and-group.model';
import { selectSelectedClasses, selectModalState } from '../../ngrx/selectors';
import { ActivatedRoute } from '@angular/router';
import { ModalModel } from '../../models/modal.model';
import { openClassesAndGroupsEndModal } from '../../ngrx/actions';

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
  constructor(private store: Store<ClassesAndGroupsModel>, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.selectedClasses = this.store.select(selectSelectedClasses);
    this.modalState = this.store.select(selectModalState)
  }
  openModal() {
    this.store.dispatch(openClassesAndGroupsEndModal())
  }
  goToSubjects() {

  }
  goToDashboard() {

  }
}

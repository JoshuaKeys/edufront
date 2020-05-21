import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ClassesAndGroupsModel } from '../../models/classes-and-group.model';
import { selectSortedClasses, selectSelectedClasses, selectModalState } from '../../ngrx/selectors';
import { toggleClass, closeClassesAndGroupsModal } from '../../ngrx/actions';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalModel } from '../../models/modal.model';
import { ClassModel } from 'src/app/shared/models/class.model';

@Component({
  styleUrls: ['./classes-in-school.component.scss'],
  templateUrl: './classes-in-school.component.html'
})
export class ClassesInSchoolComponent implements OnInit {
  classes: Observable<ClassModel[]>;
  selectedClasses: Observable<ClassModel[]>
  modalState: Observable<ModalModel>;
  ngOnInit() {
    this.classes = this.store.select(selectSortedClasses);
    this.selectedClasses = this.store.select(selectSelectedClasses);
    this.modalState = this.store.select(selectModalState);
  }
  onClassClick(name: string) {
    this.store.dispatch(toggleClass({ name }))
  }
  onModalBtnClicked() {
    this.store.dispatch(closeClassesAndGroupsModal())
  }
  constructor(
    private store: Store<ClassesAndGroupsModel>,
    public activatedRoute: ActivatedRoute,
    private router: Router
  ) { }
}

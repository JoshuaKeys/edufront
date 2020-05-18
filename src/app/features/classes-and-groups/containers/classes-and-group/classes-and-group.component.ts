import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { tap, debounceTime, take } from 'rxjs/operators'
import { Store } from '@ngrx/store';
import { ClassesAndGroupsModel } from '../../models/classes-and-group.model';
import { selectNumOfGroups, selectSelectedClasses } from '../../ngrx/selectors';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { setGroupOfClassesQty, setInputError } from '../../ngrx/actions';
import { ClassModel } from '../../models/class.model';
@Component({
  selector: 'edu-classes-and-group',
  templateUrl: './classes-and-group.component.html',
  styleUrls: ['./classes-and-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassesAndGroupComponent implements OnInit {

  activatedRouteData = this.activatedRoute.snapshot.data;
  numOfGroups: Observable<number>;
  classesAndGroupsForm: FormGroup;
  selectedClasses: Observable<ClassModel[]>

  ngOnInit(): void {
    this.selectedClasses = this.store.select(selectSelectedClasses);
    this.numOfGroups = this.store.select(selectNumOfGroups);
  }
  goBack() {
    this.router.navigateByUrl(this.activatedRouteData.previous);
  }
  computeNumOfGroupsInClasses(event) {
    this.store.dispatch(setGroupOfClassesQty({ qty: event }))
  }
  isDisabled() {
    console.log(this.classesAndGroupsForm.controls.numOfGroups.value)
    return !!this.classesAndGroupsForm.value.numOfGroups;
  }
  goForward() {
    this.router.navigateByUrl(this.activatedRouteData.next);
  }

  constructor(
    public store: Store<ClassesAndGroupsModel>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }
}

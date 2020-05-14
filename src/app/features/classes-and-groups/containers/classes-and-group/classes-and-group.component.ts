import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { tap, debounceTime, take } from 'rxjs/operators'
import { Store } from '@ngrx/store';
import { ClassesAndGroupsModel } from '../../models/classes-and-group.model';
import { SetInputError, SetGroupOfClassesQty } from '../../ngrx/actions';
import { selectNumOfGroups } from '../../ngrx/selectors';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
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

  ngOnInit(): void {
    this.numOfGroups = this.store.select(selectNumOfGroups);
    this.numOfGroups.subscribe((numOfGroups) => {
      this.classesAndGroupsForm = new FormGroup({
        numOfGroups: new FormControl(numOfGroups.toString())
      })
    });
  }
  goBack() {
    this.router.navigateByUrl(this.activatedRouteData.previous);
  }
  setQty() {
    const val = this.classesAndGroupsForm.value.numOfGroups;
    const valToNum = +val;

    if (valToNum !== 0 && !valToNum) {
      this.store.dispatch(SetInputError({ error: 'Invalid Input entered', value: val }));
      return;
    } console.log('holla')
    this.store.dispatch(SetGroupOfClassesQty({ qty: valToNum }))
    this.goForward();
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

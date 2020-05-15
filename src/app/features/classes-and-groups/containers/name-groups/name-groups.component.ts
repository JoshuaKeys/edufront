import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { selectNumOfGroups, selectSelectedClasses } from '../../ngrx/selectors';
import { Observable } from 'rxjs';
import { ClassesAndGroupsModel } from '../../models/classes-and-group.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setInputError, setGroupOfClassesQty } from '../../ngrx/actions';
import { ClassModel } from '../../models/class.model';

@Component({
  selector: 'edu-name-groups',
  templateUrl: './name-groups.component.html',
  styleUrls: ['./name-groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NameGroupsComponent implements OnInit {

  activatedRouteData = this.activatedRoute.snapshot.data;
  numOfGroups: Observable<number>;
  classesAndGroupsForm: FormGroup;
  selectedClasses: Observable<ClassModel[]>
  ngOnInit(): void {
    this.selectedClasses = this.store.select(selectSelectedClasses);
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
      this.store.dispatch(setInputError({ error: 'Invalid Input entered', value: val }));
      return;
    } console.log('holla')
    this.store.dispatch(setGroupOfClassesQty({ qty: valToNum }))
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

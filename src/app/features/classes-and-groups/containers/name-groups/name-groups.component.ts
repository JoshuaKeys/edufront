import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { selectNumOfGroups, selectSelectedClasses, selectGroupsClassMap, selectAnUngroupedClass } from '../../ngrx/selectors';
import { Observable } from 'rxjs';
import { ClassesAndGroupsModel } from '../../models/classes-and-group.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setInputError, setGroupOfClassesQty, initializeGroupClassMap, setDroppedState, addClassToGroup, removeDroppedState, removeClassFromGroup, changeGroupName, requestGroupsClassMap } from '../../ngrx/actions';
import { ClassModel } from '../../models/class.model';
import { map } from 'rxjs/operators';
import { GroupClassMapModel } from '../../models/group-class-map.model'
@Component({
  selector: 'edu-name-groups',
  templateUrl: './name-groups.component.html',
  styleUrls: ['./name-groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NameGroupsComponent implements OnInit {

  activatedRouteData = this.activatedRoute.snapshot.data;
  numOfGroups: Observable<number>;
  groupClassMap: Observable<GroupClassMapModel[]>;
  classesAndGroupsForm: FormGroup;
  selectedClasses: Observable<ClassModel[]>
  hasUngroupedClass: Observable<boolean>
  ngOnInit(): void {

    this.store.dispatch(requestGroupsClassMap())

    this.selectedClasses = this.store.select(selectSelectedClasses);
    this.numOfGroups = this.store.select(selectNumOfGroups);
    this.groupClassMap = this.store.select(selectGroupsClassMap);
    this.numOfGroups.subscribe((numOfGroups) => {
      this.classesAndGroupsForm = new FormGroup({
        numOfGroups: new FormControl(numOfGroups.toString())
      })
    });
    this.hasUngroupedClass = this.store.select(selectAnUngroupedClass).pipe(
      map(item => !!item)
    )
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
  deselectClass(deselectData: { class: ClassModel, groupName: string }) {
    this.store.dispatch(removeDroppedState({ className: deselectData.class.name }))
    this.store.dispatch(removeClassFromGroup({ className: deselectData.class.name, groupName: deselectData.groupName }))
  }
  handleDropped(dropData: { class: ClassModel, groupName: string }) {
    if (!dropData.class.dragged) {
      this.store.dispatch(setDroppedState({ className: dropData.class.name }))
      this.store.dispatch(addClassToGroup({ className: dropData.class.name, groupName: dropData.groupName }))
    }

  }
  onGroupNameChange(nameChange: { oldName: string, newName: string }) {
    this.store.dispatch(changeGroupName({ newName: nameChange.newName, oldName: nameChange.oldName }))
  }
  constructor(
    public store: Store<ClassesAndGroupsModel>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }
}

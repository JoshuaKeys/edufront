import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ClassesService } from 'src/app/root-store/classes.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { fetchGeneratedGroups, fetchAllClasses } from '../../ngrx/actions/console-classes';
import { ExtendedClassModel } from 'src/app/features/subjects/models/extend-class.model';
import { selectConsoleClasses, selectConsoleGroups } from '../../ngrx/selectors/console-classes';
import { GeneratedGroupsModel } from '../../models/generated-groups.model';

@Component({
  selector: 'edu-console-classes-and-groups',
  templateUrl: './console-classes-and-groups.component.html',
  styleUrls: ['./console-classes-and-groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsoleClassesAndGroupsComponent implements OnInit {
  // classes$ = this.classService.entities$
  classes$: Observable<ExtendedClassModel[]>;
  classesLoading$ = this.classService.loading$;
  classesAndGroups$: Observable<GeneratedGroupsModel[]>;
  ngOnInit(): void {
    this.store.dispatch(fetchAllClasses())
    this.store.dispatch(fetchGeneratedGroups())
    this.classes$ = this.store.select(selectConsoleClasses);
    this.classesAndGroups$ = this.store.select(selectConsoleGroups);
    this.classService.getAll()
    this.badgeMultiSelect = this.badgeArr.map(badge => ({
      value: badge,
      display: badge
    }));
    console.log(this.badgeMultiSelect);
  }

  badgeArr = new Array(9).fill('');
  badgeMultiSelect = [];
  dropZoneArr = [
    { title: 'primary', popoverIsOpened: false },
    { title: 'middle', popoverIsOpened: false },
    { title: 'secondary', popoverIsOpened: false },
    { title: 'higher secondary', popoverIsOpened: false }
  ];

  //deletepopover toggle
  deletePopoverState = false;
  toggleDeletePopover() {
    this.deletePopoverState = !this.deletePopoverState;
  }

  //multiselect implementation
  activeArr = [];
  tempActiveArr = [];
  multiselectPopoverState = false;

  isActive(value) {
    return this.tempActiveArr.indexOf(value) !== -1;
  }
  openMultiSelect() {
    this.tempActiveArr = [...this.activeArr];
  }

  closeWithoutTick() {
    this.tempActiveArr = [];
  }
  toggleOption(value) {
    let valueIsCurrentlyActive = this.tempActiveArr.indexOf(value) !== -1;
    if (valueIsCurrentlyActive) {
      this.tempActiveArr = this.tempActiveArr.filter(
        currentValue => value !== currentValue
      );
    } else {
      this.tempActiveArr = [...this.tempActiveArr, value];
    }
    console.log(this.tempActiveArr);
  }

  eduTickClick() {
    this.multiselectPopoverState = !this.multiselectPopoverState;
    this.activeArr = [...this.tempActiveArr];
    console.log(this.activeArr);
  }

  constructor(private classService: ClassesService, private store: Store) {

  }
}

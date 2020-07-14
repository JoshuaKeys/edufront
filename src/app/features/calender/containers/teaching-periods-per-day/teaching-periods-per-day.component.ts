import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ClassModel } from 'src/app/shared/models/class.model';
import { ClassGroupModel } from '../../models/class-group.model';
import { CalendarStateModel } from '../../models/calender-state.model';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { TeachingDay } from '../../models/teaching-day.model';
import { of, Observable } from 'rxjs';
import {
  selectClassesAndGroups,
  selectTeaching,
  selectAllClasses,
  selectPeriodSelected,
  selectOrphanedClasses
} from '../../ngrx/selectors';
import { map } from 'rxjs/operators';
import { TeachingStateModel } from '../../models/teaching-state.model';
import {
  reassignClass,
  selectTeachingDay,
  updateSelectedTeachingDaysRequest,
  addClassesGroup,
  addPeriodsToGroup,
  setGroupTeachingDays,
  setGroupPeriods
} from '../../ngrx/actions/calendar.actions';
import { SelectedPeriodModel } from '../../models/selected-period.model';
import { v4 as uuid44 } from 'uuid';
import { SelectionModel } from '../../models/selection.model';
import { buildRangePipe } from '../../utilities';
@Component({
  selector: 'edu-teaching-periods-per-day',
  templateUrl: './teaching-periods-per-day.component.html',
  styleUrls: ['./teaching-periods-per-day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeachingPeriodsPerDayComponent implements OnInit {
  orphanedClasses: Observable<ClassModel[]>;
  activatedRouteData = this.activatedRoute.snapshot.data;
  classesAndGroups: Observable<ClassGroupModel[]>;
  selection: Observable<SelectionModel>;
  calendarData: Observable<TeachingStateModel>;
  allClasses: Observable<ClassModel[]>;
  periods = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  constructor(
    private store: Store<CalendarStateModel>,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.orphanedClasses = this.store.select(selectOrphanedClasses);
    this.calendarData = this.store.select(selectTeaching);
    this.classesAndGroups = this.store.select(selectClassesAndGroups);
    this.selection = this.store.select(selectPeriodSelected);
    this.allClasses = this.store.select(selectAllClasses).pipe(
      map(unsortedClasses => {
        const unsortedClassesCopy: ClassModel[] = JSON.parse(
          JSON.stringify(unsortedClasses)
        );
        return unsortedClassesCopy.sort(
          (itemA, itemB) => itemA.grade - itemB.grade
        );
      })
    );
    // this.allClasses.subscribe(console.log)
  }
  toggleActiveClass(classItem: ClassModel, classesGroup: ClassGroupModel) {
    this.store.dispatch(reassignClass({ class: classItem, classesGroup }));
  }
  isPresent(classes: ClassModel[], classItem: ClassModel) {
    for (let i = 0; i < classes.length; i++) {
      if (classes[i].id === classItem.id) {
        return true;
      }
    }
    return false;
  }
  debug(item) {
    console.log(item);
  }
  toggleActive(day: TeachingDay, classesGroup: ClassGroupModel) {
    // this.store.dispatch(toggleClassesGroupActive({day, classesGroup}))
  }
  parsePeriodValue(arr) {
    if (arr.length == 0) {
      return '';
    }
    let displayValue = '';
    let temp = arr
      .map(number => {
        let suffix;
        if (typeof number === 'string' && number.toLowerCase() === 'all') {
          return `${number}`;
        }
        if (number == 1) {
          suffix = 'st';
        } else if (number == 2) {
          suffix = 'nd';
        } else if (number == 3) {
          suffix = 'rd';
        } else {
          suffix = 'th';
        }
        number = `${number}`.replace('P', '');
        return `${number}${suffix}`;
      })
      .reduce((a, b) => `${a},${b}`);
    if (arr.length == 1 && arr[0] == '') {
      displayValue = '';
    } else {
      displayValue = `${temp} period`;
    }
    // displayValue = `${temp} period`;
    // }
    return displayValue;
  }
  asObservable(item) {
    return of(item);
  }
  computeClasses(classes: ClassModel[]) {
    const grades = classes
      .map(classItem => classItem.grade)
      .sort((a, b) => a - b);
    const result = buildRangePipe(grades);
    return result;
  }
  addGroup() {
    // alert('hello')
    const generatedGroupId = uuid44();
    this.store.dispatch(addClassesGroup({ generatedGroupId }));
    this.store.dispatch(addPeriodsToGroup({ generatedGroupId }));
  }
  addNewGroup(classItem: ClassModel) {
    const generatedGroupId = uuid44();
    this.store.dispatch(addClassesGroup({ generatedGroupId }));
    this.store.dispatch(
      reassignClass({ class: classItem, groupId: generatedGroupId })
    );
    this.store.dispatch(setGroupTeachingDays({ groupId: generatedGroupId }));
    this.store.dispatch(setGroupPeriods({ groupId: generatedGroupId }));
  }
  selectPeriod($event: SelectedPeriodModel) {
    this.store.dispatch(selectTeachingDay($event));
  }
  updateSelectedDays(updateTo: number) {
    this.store.dispatch(updateSelectedTeachingDaysRequest({ updateTo }));
  }

  //new addition for multi select
  popoverToggleVar = false;
  _tempAllClasses;
  _tempActiveArr = [];
  toggleTempActive(classItem) {
    let isNotActive = true;
    this._tempActiveArr = this._tempActiveArr.filter((activeItem, index) => {
      if (activeItem.id === classItem.id) {
        isNotActive = false;
        return false;
      }
      return true;
    });
    if (isNotActive) {
      this._tempActiveArr.push(classItem);
    }
  }
  isActiveInTemp(classItem) {
    for (let i = 0; i < this._tempActiveArr.length; i++) {
      if (this._tempActiveArr[i].id === classItem.id) {
        return true;
      }
    }
    return false;
  }

  popoverOpen(allClasses, activeArr) {
    console.log('POPOVER OPEN', activeArr);
    this._tempAllClasses = JSON.parse(JSON.stringify(allClasses));
    this._tempActiveArr = JSON.parse(JSON.stringify(activeArr));

    console.log(allClasses);
  }

  confirmSelection(classesGroup: ClassGroupModel) {
    let diffClasses = [];

    //check _tempActiveArr against classesGroup.item to determine any deletions
    classesGroup.classes.forEach(classGroup => {
      let classExistOnTempActiveArr = false;
      for (let i = 0; i < this._tempActiveArr.length; i++) {
        if (this._tempActiveArr[i].id === classGroup.id) {
          classExistOnTempActiveArr = true;
          break;
        }
      }
      // console.log(classExistOnTempActiveArr);
      if (!classExistOnTempActiveArr) {
        diffClasses.push(classGroup);
      }
    });

    //check classesGroup.item  against _tempActiveArr   to determine any additions
    this._tempActiveArr.forEach(tempClassGroup => {
      let classExistOnTempActiveArr = false;
      for (let i = 0; i < classesGroup.classes.length; i++) {
        if (classesGroup.classes[i].id === tempClassGroup.id) {
          classExistOnTempActiveArr = true;
          break;
        }
      }
      // console.log(classExistOnTempActiveArr);
      if (!classExistOnTempActiveArr) {
        diffClasses.push(tempClassGroup);
      }
    });

    console.log(diffClasses);
    diffClasses.forEach(classItem => {
      this.store.dispatch(reassignClass({ class: classItem, classesGroup }));
      console.log('push to store');
    });
    console.log(this.popoverToggleVar);
    this.popoverToggleVar = !this.popoverToggleVar;
    console.log(this.popoverToggleVar);
  }

  confirmNewSelection(clickEvent: Event) {
    console.log(this.popoverToggleVar);
    this.popoverToggleVar = !this.popoverToggleVar;
    console.log(this.popoverToggleVar);
    if (this._tempActiveArr.length > 0) {
      const generatedGroupId = uuid44();
      this.store.dispatch(addClassesGroup({ generatedGroupId }));
      this._tempActiveArr.forEach(classItem => {
        this.store.dispatch(
          reassignClass({ class: classItem, groupId: generatedGroupId })
        );
      });

      this.store.dispatch(setGroupTeachingDays({ groupId: generatedGroupId }));
    }
  }
}

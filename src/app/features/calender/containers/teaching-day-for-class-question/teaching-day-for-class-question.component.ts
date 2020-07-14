import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { Store } from '@ngrx/store';
import { CalendarStateModel } from '../../models/calender-state.model';
import {
  fetchClassesAndGroups,
  toggleClassesGroupActive,
  getAllClassesRequest,
  reassignClass,
  addClassesGroup,
  setGroupTeachingDays
} from '../../ngrx/actions/calendar.actions';
import { Observable, of } from 'rxjs';
import { ClassGroupModel } from '../../models/class-group.model';
import {
  selectClassesAndGroups,
  selectTeachingDays,
  selectAllClasses,
  selectOrphanedClasses
} from '../../ngrx/selectors';
import { TeachingDay } from '../../models/teaching-day.model';
import { ClassModel } from 'src/app/shared/models/class.model';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { v4 as uuid44 } from 'uuid';
import { buildRangePipe } from '../../utilities';

@Component({
  selector: 'edu-teaching-day-for-class-question',
  templateUrl: './teaching-day-for-class-question.component.html',
  styleUrls: ['./teaching-day-for-class-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeachingDayForClassQuestionComponent implements OnInit {
  classesAndGroups: Observable<ClassGroupModel[]>;
  orphanedClasses: Observable<ClassModel[]>;
  teachingDays: Observable<TeachingDay[]>;
  allClasses: Observable<ClassModel[]>;
  activatedRouteData = this.activatedRoute.snapshot.data;
  constructor(
    private store: Store<CalendarStateModel>,
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  computeClasses(classes: ClassModel[]) {
    const grades = classes
      .map(classItem => classItem.grade)
      .sort((a, b) => a - b);
    const result = buildRangePipe(grades);
    return result;
  }
  ngOnInit(): void {
    this.store.dispatch(fetchClassesAndGroups());
    this.store.dispatch(getAllClassesRequest());
    this.orphanedClasses = this.store.select(selectOrphanedClasses);

    this.classesAndGroups = this.store.select(selectClassesAndGroups);
    this.teachingDays = this.store.select(selectTeachingDays);
    this.allClasses = this.store.select(selectAllClasses).pipe(
      map(unsortedClasses => {
        const unsortedClassesCopy: ClassModel[] = JSON.parse(
          JSON.stringify(unsortedClasses)
        );
        console.log(unsortedClasses);
        return unsortedClassesCopy.sort(
          (itemA, itemB) => itemA.grade - itemB.grade
        );
      })
    );
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
  toggleActive(day: TeachingDay, classesGroup: ClassGroupModel) {
    this.store.dispatch(toggleClassesGroupActive({ day, classesGroup }));
  }
  addGroup() {
    // alert('hello')
    // this.store.dispatch(addClassesGroup({generatedGroupId: uuid44()}))
    const generatedGroupId = uuid44();
    this.store.dispatch(addClassesGroup({ generatedGroupId }));
  }
  addNewGroup(classItem: ClassModel) {
    const generatedGroupId = uuid44();
    this.store.dispatch(addClassesGroup({ generatedGroupId }));
    this.store.dispatch(
      reassignClass({ class: classItem, groupId: generatedGroupId })
    );
    this.store.dispatch(setGroupTeachingDays({ groupId: generatedGroupId }));
  }
  asObservable(item) {
    return of(item);
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
    this.cd.markForCheck();
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
    this.cd.markForCheck();
  }
}

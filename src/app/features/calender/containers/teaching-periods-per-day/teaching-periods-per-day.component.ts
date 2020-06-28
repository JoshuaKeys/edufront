import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ClassModel } from 'src/app/shared/models/class.model';
import { ClassGroupModel } from '../../models/class-group.model';
import { CalendarStateModel } from '../../models/calender-state.model';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { TeachingDay } from '../../models/teaching-day.model';
import { of, Observable } from 'rxjs';
import { selectClassesAndGroups, selectTeaching, selectAllClasses, selectPeriodSelected } from '../../ngrx/selectors';
import { map } from 'rxjs/operators';
import { TeachingStateModel } from '../../models/teaching-state.model';
import { reassignClass, selectTeachingDay,  updateSelectedTeachingDaysRequest, addClassesGroup, addPeriodsToGroup, setGroupTeachingDays, setGroupPeriods } from '../../ngrx/actions/calendar.actions';
import { SelectedPeriodModel } from '../../models/selected-period.model';
import { v4 as uuid44} from 'uuid';
import { SelectionModel } from '../../models/selection.model';
@Component({
  selector: 'edu-teaching-periods-per-day',
  templateUrl: './teaching-periods-per-day.component.html',
  styleUrls: ['./teaching-periods-per-day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeachingPeriodsPerDayComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data;
  classesAndGroups: Observable<ClassGroupModel[]>;
  selection: Observable<SelectionModel>;
  calendarData: Observable<TeachingStateModel>;
  allClasses: Observable<ClassModel[]>;
  periods = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  constructor(private store: Store<CalendarStateModel>, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.calendarData = this.store.select(selectTeaching);
    this.classesAndGroups = this.store.select(selectClassesAndGroups);
    this.selection = this.store.select(selectPeriodSelected);
    this.allClasses = this.store.select(selectAllClasses).pipe(
      map(unsortedClasses => {
        const unsortedClassesCopy: ClassModel[] = JSON.parse(JSON.stringify(unsortedClasses))
        return unsortedClassesCopy.sort((itemA, itemB)=> itemA.grade - itemB.grade)
      })
    )
    // this.allClasses.subscribe(console.log)
  }
  toggleActiveClass(classItem: ClassModel, classesGroup: ClassGroupModel) {
    this.store.dispatch(reassignClass({class: classItem, classesGroup}))
  }
  isPresent(classes: ClassModel[], classItem: ClassModel) {
    for(let i = 0; i < classes.length; i++) {
      if(classes[i].id === classItem.id) {
        return true
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
  asObservable(item) {
    return of(item);
  }
  addGroup() {
    // alert('hello')
    const generatedGroupId = uuid44();
    this.store.dispatch(addClassesGroup({generatedGroupId}))
    this.store.dispatch(addPeriodsToGroup({generatedGroupId}))

  }
  addNewGroup(classItem: ClassModel) {
    const generatedGroupId = uuid44();
    this.store.dispatch(addClassesGroup({generatedGroupId}))
    this.store.dispatch(reassignClass({class: classItem, groupId: generatedGroupId}))
    this.store.dispatch(setGroupTeachingDays({groupId: generatedGroupId}))
    this.store.dispatch(setGroupPeriods({groupId: generatedGroupId}))
  } 
  selectPeriod($event: SelectedPeriodModel) {
    this.store.dispatch(selectTeachingDay($event))
  }
  updateSelectedDays(updateTo: number) {
    this.store.dispatch(updateSelectedTeachingDaysRequest({updateTo}));
  }
}

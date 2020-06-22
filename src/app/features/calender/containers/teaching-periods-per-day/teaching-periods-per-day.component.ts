import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ClassModel } from 'src/app/shared/models/class.model';
import { ClassGroupModel } from '../../models/class-group.model';
import { CalendarStateModel } from '../../models/calender-state.model';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { TeachingDay } from '../../models/teaching-day.model';
import { of, Observable } from 'rxjs';
import { selectClassesAndGroups, selectCalendar, selectTeaching, selectAllClasses } from '../../ngrx/selectors';
import { map } from 'rxjs/operators';
import { CalendarModel } from '../../models/calendar.model';
import { TeachingStateModel } from '../../models/teaching-state.model';
import { reassignClass } from '../../ngrx/actions/calendar.actions';

@Component({
  selector: 'edu-teaching-periods-per-day',
  templateUrl: './teaching-periods-per-day.component.html',
  styleUrls: ['./teaching-periods-per-day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeachingPeriodsPerDayComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data;
  classesAndGroups: Observable<ClassGroupModel[]>;
  calendarData: Observable<TeachingStateModel>;
  allClasses: Observable<ClassModel[]>;
  periods = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  constructor(private store: Store<CalendarStateModel>, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.calendarData = this.store.select(selectTeaching);
    this.classesAndGroups = this.store.select(selectClassesAndGroups);
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
    console.log(classes, classItem)
    for(let i = 0; i < classes.length; i++) {
      if(classes[i].id === classItem.id) {
        return true
      }
    }
    return false;
  }
  toggleActive(day: TeachingDay, classesGroup: ClassGroupModel) {
    // this.store.dispatch(toggleClassesGroupActive({day, classesGroup}))
  }
  asObservable(item) {
    return of(item);
  }
}

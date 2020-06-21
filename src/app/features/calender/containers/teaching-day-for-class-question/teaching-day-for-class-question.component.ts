import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { CalendarStateModel } from '../../models/calender-state.model';
import { fetchClassesAndGroups, toggleClassesGroupActive, getAllClassesRequest, reassignClass } from '../../ngrx/actions/calendar.actions';
import { Observable, of } from 'rxjs';
import { ClassGroupModel } from '../../models/class-group.model';
import { selectClassesAndGroups, selectTeachingDays, selectAllClasses } from '../../ngrx/selectors';
import { TeachingDay } from '../../models/teaching-day.model';
import { ClassModel } from 'src/app/shared/models/class.model';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'edu-teaching-day-for-class-question',
  templateUrl: './teaching-day-for-class-question.component.html',
  styleUrls: ['./teaching-day-for-class-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeachingDayForClassQuestionComponent implements OnInit {
  classesAndGroups: Observable<ClassGroupModel[]>;
  teachingDays: Observable<TeachingDay[]>;
  allClasses: Observable<ClassModel[]>;
  activatedRouteData = this.activatedRoute.snapshot.data;
  constructor(private store: Store<CalendarStateModel>, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.store.dispatch(fetchClassesAndGroups())
    this.store.dispatch(getAllClassesRequest())
    this.classesAndGroups = this.store.select(selectClassesAndGroups);
    this.teachingDays = this.store.select(selectTeachingDays);
    this.allClasses = this.store.select(selectAllClasses).pipe(
      map(unsortedClasses => {
        const unsortedClassesCopy: ClassModel[] = JSON.parse(JSON.stringify(unsortedClasses))
        return unsortedClassesCopy.sort((itemA, itemB)=> itemA.grade - itemB.grade)
      })
    )
  }
  toggleActiveClass(classItem: ClassModel, classesGroup: ClassGroupModel) {
    this.store.dispatch(reassignClass({class: classItem, classesGroup}))
  }
  isPresent(classes: ClassModel[], classItem: ClassModel) {
    // return allClasses.find(allClassesItem => allClassesItem.id === classItem.id && classItem.selected)
    for(let i = 0; i < classes.length; i++) {
      if(classes[i].id === classItem.id) {
        return true
      }
    }
    return false;
  }
  toggleActive(day: TeachingDay, classesGroup: ClassGroupModel) {
    this.store.dispatch(toggleClassesGroupActive({day, classesGroup}))
  }
  asObservable(item) {
    return of(item);
  }
}
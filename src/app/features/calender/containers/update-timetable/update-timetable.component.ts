import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ClassModel } from 'src/app/shared/models/class.model';
import { selectAllClasses, selectTeachingDays, selectTeaching } from '../../ngrx/selectors';
import { Store } from '@ngrx/store';
import { CalendarStateModel } from '../../models/calender-state.model';
import { map } from 'rxjs/operators';
import { TeachingDay } from '../../models/teaching-day.model';
import { SelectedPeriodModel } from '../../models/selected-period.model';
import { selectTeachingDay } from '../../ngrx/actions/calendar.actions';
import { ClassGroupModel } from '../../models/class-group.model';
import { ActivatedRoute } from '@angular/router';
import { TeachingStateModel } from '../../models/teaching-state.model';

@Component({
  selector: 'edu-update-timetable',
  templateUrl: './update-timetable.component.html',
  styleUrls: ['./update-timetable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateTimetableComponent implements OnInit {
  allClasses: Observable<ClassModel[]>;
  teachingState: Observable<TeachingStateModel>;
  @ViewChild('scrollableEl') scrollableEl: ElementRef;

  constructor(private store: Store<CalendarStateModel>, private activatedRoute: ActivatedRoute) {}

  emptyArr = new Array(100);
  ngOnInit(): void {
    this.teachingState= this.store.select(selectTeaching);
    this.allClasses = this.store.select(selectAllClasses).pipe(
      map(unsortedClasses => {
        const unsortedClassesCopy: ClassModel[] = JSON.parse(JSON.stringify(unsortedClasses))
        return unsortedClassesCopy.sort((itemA, itemB)=> itemA.grade - itemB.grade)
      })
    )
  }
  toggleActive(event) {

  }
  getGroup(groups: ClassGroupModel[]) {
    console.log(groups.find(group=> group.id === this.activatedRoute.snapshot.queryParams.groupId));
    return of(groups.find(group=> group.id === this.activatedRoute.snapshot.queryParams.groupId));
  }
  selectPeriod($event: SelectedPeriodModel) {
    this.store.dispatch(selectTeachingDay($event))
  }
  asObservable(item) {
    return of(item);
  }
  startScroll(el) {
    if (typeof this.scrollableEl === 'undefined') {
      return true;
    }
    var vh = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    var scrollableHeight = this.scrollableEl.nativeElement.offsetHeight;
    var maxHeight = vh - 360;

    let res = scrollableHeight >= maxHeight - 10;
    return res;
  }
}

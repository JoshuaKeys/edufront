import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { TeachingStateModel } from '../../models/teaching-state.model';
import { Store } from '@ngrx/store';
import { CalendarStateModel } from '../../models/calender-state.model';
import { selectTeaching, selectCalendar, selectCalendarModalState } from '../../ngrx/selectors';
import { ClassGroupModel } from '../../models/class-group.model';
import { ActivatedRoute, Router } from '@angular/router';
import { editCalendar, sendCalendarData } from '../../ngrx/actions/calendar.actions';
import { ClassModel } from 'src/app/shared/models/class.model';
import { buildRangePipe } from '../../utilities';
import { CalendarModalModel } from '../../models/calender-modal.model';
import { toggleEndModal } from '../../ngrx/actions';
import { Location } from '@angular/common';


@Component({
  selector: 'edu-calendar-confirmation',
  templateUrl: './calendar-confirmation.component.html',
  styleUrls: ['./calendar-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarConfirmationComponent implements OnInit {
  teachingData: Observable<TeachingStateModel>;
  activatedRouteData = this.activatedRoute.snapshot.data;
  modalState: Observable<CalendarModalModel>;
  constructor(
    private store: Store<CalendarStateModel>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.teachingData = this.store.select(selectTeaching);
    this.modalState = this.store.select(selectCalendarModalState);
    this.teachingData.subscribe(teachingData => console.log(teachingData.classesAndGroups[0].periods))
  }
  sendCalendarData() {
    this.store.dispatch(sendCalendarData())
  }
  computeClasses(classes: ClassModel[]) {
    const grades = classes.map(classItem => classItem.grade).sort((a, b) => a - b);
    const result = buildRangePipe(grades);
    return result
  }
  goToDashboard() {
    this.router.navigateByUrl('/dashboard')
  }
  goNext() {

  }
  computeClassName(classGroup: ClassGroupModel) {
    let classes = '';
    for (let i = 0; i < classGroup.classes.length; i++) {
      if (i < classGroup.classes.length - 1) {
        classes += classGroup.classes[i].name + '|';
      } else {
        classes += classGroup.classes[i].name;
      }
    }
    return classes;
  }
  @ViewChild('scrollableEl') scrollableEl: ElementRef;

  imageSize = {
    width: '380px',
    height: '456px'
  };

  onEdit(index, group: ClassGroupModel) {
    this.store.dispatch(editCalendar({ group }));
    this.router.navigate(['../', this.activatedRouteData.next], {
      relativeTo: this.activatedRoute, queryParams: {
        groupId: group.id
      }
    })
  }
  onTick(index) {
    console.log(`tick @ ${index}`);
  }
  goBack() {
    this.location.back()
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
    var maxHeight = vh - 330;
    // console.log(
    //   'maxHeight - ' + maxHeight + ',scrollable - ' + scrollableHeight
    // );
    let res = scrollableHeight >= maxHeight - 10;
    // console.log(res);
    return res;
  }
}

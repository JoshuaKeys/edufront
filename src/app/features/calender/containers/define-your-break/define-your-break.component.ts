import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TeachingStateModel } from '../../models/teaching-state.model';
import { Store } from '@ngrx/store';
import { CalendarStateModel } from '../../models/calender-state.model';
import { selectTeaching } from '../../ngrx/selectors';

@Component({
  selector: 'edu-define-your-break',
  templateUrl: './define-your-break.component.html',
  styleUrls: ['./define-your-break.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefineYourBreakComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data;
  teachingState: Observable<TeachingStateModel>;
  constructor(private activatedRoute: ActivatedRoute, private store: Store<CalendarStateModel>) { }

  ngOnInit(): void {
    this.teachingState = this.store.select(selectTeaching);
  }
  timeArr = Array(60).fill('');
  formArr = [0];

  addformArr() {
    this.formArr.push(0);
  }

  @ViewChild('scrollableEl') scrollableEl: ElementRef;
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

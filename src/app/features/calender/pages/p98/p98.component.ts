import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild
} from '@angular/core';
@Component({
  selector: 'edu-p98',
  templateUrl: './p98.component.html',
  styleUrls: ['./p98.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class P98Component implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  timeArr = Array(60).fill('');
  dayArr = ['All', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  periodArr = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'];
  popoverArr = Array(12).fill('');
  popoverState = false;
  classArr = [
    {
      break: [0]
    }
  ];

  closePopover() {
    this.popoverState = !this.popoverState;
  }
  addBreakArr(index) {
    this.classArr[index].break.push(1);
  }
  addClassArr() {
    this.classArr.push({ break: [0] });
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

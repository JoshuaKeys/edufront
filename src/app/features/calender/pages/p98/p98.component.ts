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

  popoverArr = Array(12).fill('');
  classArr = [
    {
      break: [0]
    }
  ];

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

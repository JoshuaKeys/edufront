import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'edu-define-same-breaks',
  templateUrl: './define-same-breaks.component.html',
  styleUrls: ['./define-same-breaks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefineSameBreaksComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
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

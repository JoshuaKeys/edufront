import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'edu-p102',
  templateUrl: './p102.component.html',
  styleUrls: ['./p102.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class P102Component implements OnInit {
  @ViewChild('scrollableEl') scrollableEl: ElementRef;
  constructor() {}

  emptyArr = new Array(100);

  ngOnInit(): void {}
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
    // console.log(
    //   'maxHeight - ' + maxHeight + ',scrollable - ' + scrollableHeight
    // );
    let res = scrollableHeight >= maxHeight - 10;
    // console.log(res);
    return res;
  }
}

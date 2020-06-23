import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'edu-p97',
  templateUrl: './p97.component.html',
  styleUrls: ['./p97.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class P97Component implements OnInit {
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

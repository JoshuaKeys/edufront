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
  parsePeriodValue(arr) {
    if (arr.length == 0) {
      console.log('period return');
      return '';
    }
    let displayValue = '';

    let temp = arr
      .map(number => {
        let suffix;
        if (typeof number === 'string' && number.toLowerCase() === 'all') {
          return `${number}`;
        }

        if (number == 1) {
          suffix = 'st';
        } else if (number == 2) {
          suffix = 'nd';
        } else if (number == 3) {
          suffix = 'rd';
        } else {
          suffix = 'th';
        }
        return `${number}${suffix}`;
      })
      .reduce((a, b) => `${a},${b}`);
    displayValue = `${temp} period`;
    // }
    return displayValue;
  }

  parseDayValue(arr) {
    console.log(arr);
    let displayValue = '';
    if (arr.length == 0) {
      return '';
    }
    let temp = arr.reduce((a, b) => `${a},${b}`);
    displayValue = `${temp} period`;
    // }
    return arr.reduce((a, b) => `${a},${b}`);
  }
  periodOption = [
    { value: 1, display: 'P1' },
    { value: 2, display: 'P2' },
    { value: 3, display: 'P3' },
    { value: 4, display: 'P4' },
    { value: 5, display: 'P5' },
    { value: 6, display: 'P6' },
    { value: 11, display: 'P11' },
    { value: 12, display: 'P12' },
    { value: 13, display: 'P13' },
    { value: 14, display: 'P14' },
    { value: 15, display: 'P15' },
    { value: 16, display: 'P16' }
  ];
  dayOptions = [
    { value: 'all', display: 'All' },
    { value: 'Mon', display: 'Mon' },
    { value: 'Tue', display: 'Tue' },
    { value: 'Wed', display: 'Wed' },
    { value: 'Thu', display: 'Thu' },
    { value: 'Fri', display: 'Fri' },
    { value: 'Sat', display: 'Sat' },
    { value: 'Sun', display: 'Sun' }
  ];
}

import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'edu-define-same-breaks',
  templateUrl: './define-same-breaks.component.html',
  styleUrls: ['./define-same-breaks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefineSameBreaksComponent implements OnInit {
  constructor() {}
  testDataArr = [
    {
      title: 'testTitle',
      day: ['Mon', 'Tue'],
      after: [1, 2],
      duration: 10
    },
    {
      title: 'testTitle1',
      day: ['all'],
      after: [1],
      duration: 30
    }
  ];

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
  test() {}
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
    { value: 6, display: 'P6' }
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

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { newArray } from '@angular/compiler/src/util';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'edu-ngmodel-test',
  templateUrl: './ngmodel-test.component.html',
  styleUrls: ['./ngmodel-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgmodelTestComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.selectArr$.subscribe(subValue => {
      console.log('sub value - ' + JSON.stringify(subValue, null, 2));
    });

    this.populatingSelectOptions();
    this.selectArr = this.selectArr.map(select => {
      return this.selectOptions[Math.round(Math.random() * 10)].value;
    });
    this.selectArr$.next([...this.selectArr]);
    console.log(this.selectArr);
  }

  selectArr = new Array(10).fill(1);
  selectArr$ = new BehaviorSubject([]);
  selectOptions = [];
  // selectOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  singelArrValue = 2;
  updateSelectArr(value, index) {
    this.selectArr[index] = value;
    this.selectArr$.next([...this.selectArr]);
  }

  populatingSelectOptions() {
    for (let i = 0; i < 11; i++) {
      this.selectOptions.push({ value: `value-${i}`, display: i });
    }
  }
}

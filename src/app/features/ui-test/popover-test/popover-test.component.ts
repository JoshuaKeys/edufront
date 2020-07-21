import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SampleDataTestComponent } from '../sample-data-test/sample-data-test.component';
@Component({
  selector: 'edu-popover-test',
  templateUrl: './popover-test.component.html',
  styleUrls: ['./popover-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopoverTestComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  testArr = [
    { component: SampleDataTestComponent, param: { title: 'test' } },
    SampleDataTestComponent,
    SampleDataTestComponent,
    SampleDataTestComponent
  ];

  testArr2 = [
    { component: SampleDataTestComponent, param: { title: 'test' }, id: '01' },
    { component: SampleDataTestComponent, param: { title: 'test' }, id: '02' }
  ];

  arrIndex = 0;
  displayArr: any = [
    { component: SampleDataTestComponent, param: { title: 'test' }, id: '01' },
    { component: SampleDataTestComponent, param: { title: 'test' }, id: '02' }
  ];
  //its either passing of a component straight, OR {component,param,output}
  btnTest = false;
  toggleBtn() {
    this.btnTest = !this.btnTest;
  }
  id = 3;
  toggleStuff() {
    this.displayArr[0].hide = this.displayArr[0].hide ? false : true;
    this.displayArr.push({
      component: SampleDataTestComponent,
      param: { title: `test @ ${this.id}` },
      id: `0${this.id}`
    });
    this.id += 1;
    // if (this.arrIndex == 0) {
    //   this.arrIndex = 1;
    //   this.displayArr = this.testArr;
    // } else {
    //   this.arrIndex = 0;
    //   this.displayArr = this.testArr2;
    // }
  }

  log(param) {
    console.log(param);
  }
}

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
  //its either passing of a component straight, OR {component,param,output}
  btnTest = false;
  toggleBtn() {
    this.btnTest = !this.btnTest;
  }

  log(param) {
    console.log(param);
  }
}

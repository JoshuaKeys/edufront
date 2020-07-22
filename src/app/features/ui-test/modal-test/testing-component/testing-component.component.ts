import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'edu-testing-component',
  templateUrl: './testing-component.component.html',
  styleUrls: ['./testing-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestingComponentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  testEvent = new EventEmitter();
  testEvent2 = new EventEmitter();
  inputValue = '';
  _title = '';
  set title(param) {
    this._title = param;
    console.log('param', param);
  }
  get title() {
    return this._title;
  }
  desc;
  random123;
  emitTest() {
    this.testEvent.emit('yo');
  }
  emitTest2() {
    this.testEvent2.emit(this.inputValue);
  }
}

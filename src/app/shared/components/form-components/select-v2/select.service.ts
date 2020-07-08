import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { OptionComponent2 } from './option/option.component';
@Injectable({
  providedIn: 'root'
})
export class SelectService {
  constructor() {}
  activeValue = new BehaviorSubject('');
  validOptionValues$ = new Subject();

  optionClicked = new Subject();

  activeOptionComponent = new BehaviorSubject(null);

  setActiveOption(value: OptionComponent2) {
    // console.log(`SETTING ACTIVE OPTIOM - ${value.displayedValue}`);
    this.activeOptionComponent.next(value);
  }

  setActiveValue(val) {
    this.activeValue.next(val);
  }
}

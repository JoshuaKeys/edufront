import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { OptionComponent } from './option/option.component';
@Injectable({
  providedIn: 'root'
})
export class SelectService {
  constructor() {}
  activeValue = new BehaviorSubject('');

  optionClicked = new Subject();

  activeOptionComponent = new BehaviorSubject(null);

  setActiveOption(value: OptionComponent) {
    // console.log(`SETTING ACTIVE OPTIOM - ${value.displayedValue}`);
    this.activeOptionComponent.next(value);
  }

  setActiveValue(val) {
    this.activeValue.next(val);
  }
}

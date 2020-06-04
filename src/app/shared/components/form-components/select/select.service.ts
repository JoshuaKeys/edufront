import { Injectable } from '@angular/core';
import { BehaviorSubject , Subject} from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class SelectService {

  constructor() {}
  activeOption = new BehaviorSubject("");
  // elementIsOpened = new BehaviorSubject(false);
  activeOptionIndex = new BehaviorSubject(null);

  optionClicked = new Subject();


  activeOptionComponent = new BehaviorSubject(null);

  setActiveOption(value){
    this.activeOption.next(value);
  }

  // setElementIsOpenState(isOpened:boolean){
  //   this.elementIsOpened.next(isOpened);
  // }

  resetOptionIndex(){
    this.activeOptionIndex.next(0);
  }
 

 



  
}

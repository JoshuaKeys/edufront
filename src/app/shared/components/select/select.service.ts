import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs"


@Injectable({
  providedIn: 'root'
})
export class SelectService {

  constructor() {}
  activeOption = new BehaviorSubject("");
  elementIsOpened = new BehaviorSubject(false);


  setActiveOption(value){
    this.activeOption.next(value);
  }

  setElementIsOpenState(isOpened:boolean){
    this.elementIsOpened.next(isOpened);
  }
 

  
}

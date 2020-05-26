import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs"
@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  constructor() { }

  $model = new BehaviorSubject({key:"", value:null});


 

  updateModel(key,value){
    this.$model.next({key,value});
  }

}

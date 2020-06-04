import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class InputService {

  constructor() { }
  inputHasError = new BehaviorSubject(false);
  validatorPosition = new BehaviorSubject("right");
}

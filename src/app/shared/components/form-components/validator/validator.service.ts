import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  constructor() {}
  validatorHasError = new BehaviorSubject(false);
  validatorPosition = new BehaviorSubject('right');
}

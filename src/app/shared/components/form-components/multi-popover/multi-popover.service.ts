import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MultiPopoverService {
  componentIdArr$ = new BehaviorSubject([]);

  constructor() {}
}

import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  loadingAction$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor() { }

  setLoadingStatus(status: boolean) {
    this.loadingSubject.next(status);
  }

}

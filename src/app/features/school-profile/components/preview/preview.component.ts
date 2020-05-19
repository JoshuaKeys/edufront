import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectorSchoolAddress, selectorSchoolContacts, selectorSchoolName } from '../../ngrx/selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'edu-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewComponent implements OnInit {
  schoolName$: Observable<any>;
  schoolAddress$: Observable<any>;
  schoolContacts$: Observable<any>;
  constructor(public store: Store<Store>) { }

  ngOnInit(): void {
    this.schoolName$ = this.store.select(selectorSchoolName);
    this.schoolAddress$ = this.store.select(selectorSchoolAddress);
    this.schoolContacts$ = this.store.select(selectorSchoolContacts);
  }

}

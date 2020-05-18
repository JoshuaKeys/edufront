import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectorSchoolName } from '../../ngrx/selectors';

@Component({
  selector: 'edu-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewComponent implements OnInit {
  schoolName$;
  constructor(public store: Store<Store>,) { }

  ngOnInit(): void {
    this.schoolName$ = this.store.select(selectorSchoolName);
  }

}

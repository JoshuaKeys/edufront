import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectorSchoolAddress, selectorSchoolContacts, selectorSchoolLogo, selectorSchoolName } from '../../ngrx/selectors';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

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
  schoolLogo$: Observable<any>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public store: Store<Store>) { }

  ngOnInit(): void {
    this.schoolName$ = this.store.select(selectorSchoolName);
    this.schoolAddress$ = this.store.select(selectorSchoolAddress);
    this.schoolContacts$ = this.store.select(selectorSchoolContacts);
    this.schoolLogo$ = this.store.select(selectorSchoolLogo);
  }

  moveto(path: string): void {
    this.router.navigate([`/school-profile/${path}`]);
  }

}

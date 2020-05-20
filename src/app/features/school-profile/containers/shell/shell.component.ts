import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { getCountries } from '../../ngrx/actions';
import { Store } from '@ngrx/store';
import { State } from '../../ngrx/state';

@Component({
  selector: 'edu-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellComponent implements OnInit {

  constructor(public store: Store<State>) { }

  ngOnInit(): void {
    this.store.dispatch(getCountries());
  }

}

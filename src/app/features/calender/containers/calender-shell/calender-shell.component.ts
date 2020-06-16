import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { PreviewModel } from '../../models/preview.model';
import { Store } from '@ngrx/store';
import { CalendarStateModel } from '../../models/calender-state.model';
import { selectPreviewState } from '../../ngrx/selectors';

@Component({
  selector: 'edu-calender-shell',
  templateUrl: './calender-shell.component.html',
  styleUrls: ['./calender-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalenderShellComponent implements OnInit {
  previewState: Observable<PreviewModel>;
  constructor(private store: Store<CalendarStateModel>) { }

  ngOnInit(): void {
    this.previewState = this.store.select(selectPreviewState);
  }

}

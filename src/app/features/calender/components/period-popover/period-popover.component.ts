import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { min } from 'moment';

@Component({
  selector: 'edu-period-popover',
  templateUrl: './period-popover.component.html',
  styleUrls: ['./period-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeriodPopoverComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() badges = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  @Input() activeBadge = 1;
  @Output('edu-change') onEduChange = new EventEmitter();

  isPresent(classes) {
    return this.activeBadge === classes;
  }
  toggleactiveBadge(classes) {
    // console.log(classes);
    this.onEduChange.emit(this.activeBadge);

    if (this.activeBadge === classes) {
      this.activeBadge = null;
    } else {
      this.activeBadge = classes;
    }
  }
}

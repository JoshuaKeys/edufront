import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';
import { min } from 'moment';

@Component({
  selector: 'edu-period-popover',
  templateUrl: './period-popover.component.html',
  styleUrls: ['./period-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeriodPopoverComponent implements OnInit {
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}

  @Input() badges = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  @Input() activeBadge = null;

  @Output('edu-change') onEduChange = new EventEmitter();

  isPresent(badg) {
    return this.activeBadge === badg;
  }
  setActiveBadge(badge) {
    if (this.activeBadge === badge) {
      this.activeBadge = null;
    } else {
      this.activeBadge = badge;
    }
  }

  popoverOpen() {
    // console.log('popover open - ' + this.activeBadge);
    // this.cd.markForCheck();
  }
  popoverClose() {
    this.onEduChange.emit(this.activeBadge);
  }
}

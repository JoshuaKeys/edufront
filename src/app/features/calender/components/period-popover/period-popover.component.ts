import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

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
  @Input() activeBadge = [1, 3];
  @Output('edu-change') onEduChange = new EventEmitter();

  isPresent(classes) {
    return this.activeBadge.indexOf(classes) !== -1;
  }
  toggleactiveBadge(classes) {
    // console.log(classes);
    if (this.activeBadge.indexOf(classes) == -1) {
      this.activeBadge.push(classes);
    } else {
      this.activeBadge = this.activeBadge.filter(
        _classes => classes !== _classes
      );
    }

    this.onEduChange.emit(this.activeBadge);
  }
}

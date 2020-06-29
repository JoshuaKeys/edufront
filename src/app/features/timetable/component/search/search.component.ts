import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'edu-timetable-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  @Input() searchPlaceholder = 'Search';
  @Input() items: any[];
  @Output() itemClicked = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
}

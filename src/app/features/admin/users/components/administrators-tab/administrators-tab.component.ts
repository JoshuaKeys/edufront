import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';

@Component({
  selector: 'edu-administrators-tab',
  templateUrl: './administrators-tab.component.html',
  styleUrls: ['./administrators-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdministratorsTabComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() owner;
  @Input() administrators;
}

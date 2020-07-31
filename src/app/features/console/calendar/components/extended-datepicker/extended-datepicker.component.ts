import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-extended-datepicker',
  templateUrl: './extended-datepicker.component.html',
  styleUrls: ['./extended-datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExtendedDatepickerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

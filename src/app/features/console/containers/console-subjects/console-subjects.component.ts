import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-console-subjects',
  templateUrl: './console-subjects.component.html',
  styleUrls: ['./console-subjects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsoleSubjectsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

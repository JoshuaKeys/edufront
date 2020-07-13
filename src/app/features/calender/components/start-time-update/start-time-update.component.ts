import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'edu-start-time-update',
  templateUrl: './start-time-update.component.html',
  styleUrls: ['./start-time-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartTimeUpdateComponent implements OnInit {

  constructor() { }
  @Input() time: string;
  @Input() day: string;
  @Output() timeChanged = new EventEmitter<{ day: string; value: string }>();
  ngOnInit(): void {
    console.log(this.time);
  }
  updateTime(event, day) {
    console.log('updated');
    console.log(event, day);
    this.timeChanged.emit({ value: event, day })
  }

}

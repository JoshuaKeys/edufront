import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { ClassModel } from 'src/app/shared/models/class.model';

interface ClassesStyle {
  fontSize: string;
  width: string;
  height: string;
}

@Component({
  selector: 'edu-timetable-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimetableOptionsComponent implements OnInit {
  @Input() classes: ClassModel[];
  @Input() style: ClassesStyle;
  @Output() clicked = new EventEmitter<string>();
  selectedClassID = null;
  constructor() {}

  ngOnInit(): void {}
  onClick(classId: string) {
    this.selectedClassID = classId;
    this.clicked.emit(classId);
  }
}

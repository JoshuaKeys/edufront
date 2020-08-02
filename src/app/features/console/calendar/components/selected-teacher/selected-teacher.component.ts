import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { ITeacher } from 'src/app/shared/models/subject.model';

@Component({
  selector: 'edu-selected-teacher',
  templateUrl: './selected-teacher.component.html',
  styleUrls: ['./selected-teacher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedTeacherComponent implements OnInit {
  @Input() teacher: ITeacher = null;
  @Output() editTeacher = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onEditTeacher() {
    this.editTeacher.emit(this.teacher);
  }
}

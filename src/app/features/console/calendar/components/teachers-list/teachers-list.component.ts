import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import { Observable } from 'rxjs';
import { ITeacher } from 'src/app/shared/models/subject.model';

@Component({
  selector: 'edu-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeachersListComponent implements OnInit {
  @Input() teachers: Observable<ITeacher[]>;
  @Output() teacherSelect = new EventEmitter();
  constructor() {}

  ngOnInit(): void {
    console.log('TeachersListComponent init');
  }

  onSelect(teacher: ITeacher) {
    this.teacherSelect.emit(teacher);
  }
}

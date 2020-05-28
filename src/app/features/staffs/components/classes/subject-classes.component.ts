import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassModel } from 'src/app/shared/models/class.model';

interface ClassesStyle {
  fontSize: string;
  width: string;
  height: string;
}
@Component({
  selector: 'edu-subject-classes',
  templateUrl: './subject-classes.component.html',
  styleUrls: ['./subject-classes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubjectClassesComponent implements OnInit {
  @Input() classes: Observable<ClassModel[]>;
  @Output() classClicked = new EventEmitter<ClassModel>();
  @Input() style: ClassesStyle;
  constructor() { }
  ngOnInit(): void {
  }
  processClicked(classItem: ClassModel) {
    this.classClicked.emit(classItem);
  }
}

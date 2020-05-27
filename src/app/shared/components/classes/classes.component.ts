import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassModel } from '../../models/class.model';
interface ClassesStyle {
  fontSize: string;
  width: string;
  height: string;
}
@Component({
  selector: 'edu-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassesComponent implements OnInit {
  @Input() classes: Observable<ClassModel[]>;
  @Output() classClicked = new EventEmitter<string>();
  @Input() style: ClassesStyle;
  constructor() { }
  ngOnInit(): void {
  }
  processClicked(name: string) {
    this.classClicked.emit(name);
  }
}

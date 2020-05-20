import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassModel } from '../../models/class.model';

@Component({
  selector: 'edu-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassesComponent implements OnInit {
  @Input() classes: Observable<ClassModel[]>;
  @Output() classClicked = new EventEmitter<string>();
  constructor() { }
  ngOnInit(): void {
  }
  processClicked(name: string) {
    this.classClicked.emit(name);
  }
}

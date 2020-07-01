import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ClassModel } from 'src/app/shared/models/class.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { ClassesStyle } from '../../../../shared/models'
interface ClassesStyle {
  fontSize: string;
  width: string;
  height: string;
}

@Component({
  selector: 'edu-classes-update',
  templateUrl: './classes-update.component.html',
  styleUrls: ['./classes-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassesUpdateComponent implements OnInit {
  @Input() classes: ClassModel[];
  @Output() classClicked = new EventEmitter<string>();
  @Input() style: ClassesStyle;

  sortedClasses$: ClassModel[];
  constructor() {}
  ngOnInit(): void {
    this.sortedClasses$ = JSON.parse(JSON.stringify(this.classes)).sort(this.sortingFn)
  }
  processClicked(name: string) {
    this.classClicked.emit(name);
  }

  sortingFn(a, b) {
    if (a.name.length != b.name.length) {
      return a.name.length > b.name.length ? 1 : -1;
    } else {
      return a.name > b.name ? 1 : -1;
    }
  }
}

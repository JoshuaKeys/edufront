import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Observable } from 'rxjs';
import { ClassModel } from '../../models/class.model';
import { map, take } from 'rxjs/operators';
export interface ClassesStyle {
  fontSize: string;
  width: string;
  height: string;
}

@Component({
  selector: 'edu-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassesComponent implements OnInit {
  @Input() classes: Observable<ClassModel[]>;
  @Output() classClicked = new EventEmitter<string>();
  @Input() style: ClassesStyle;

  sortedClasses$: Observable<ClassModel[]>;
  constructor() {}
  ngOnInit(): void {
    this.sortedClasses$ = this.classes.pipe(
      map(_classes => {
        console.log(_classes)
        return _classes//.sort(this.sortingFn);
      })
    );
  }
  debug(item) {
    console.log(item);
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

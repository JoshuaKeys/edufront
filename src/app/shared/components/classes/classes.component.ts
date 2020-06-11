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
import { map } from 'rxjs/operators';
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

  sortedClasses$: Observable<ClassModel[]>;
  constructor() {}
  ngOnInit(): void {
    this.sortedClasses$ = this.classes.pipe(
      map(_classes => {
        return _classes.sort(this.sortingFn);
      })
    );
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

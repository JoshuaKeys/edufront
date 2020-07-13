import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ElementRef
} from '@angular/core';
import { Observable } from 'rxjs';
import { ClassModel } from 'src/app/shared/models/class.model';
import { map } from 'rxjs/operators';

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

  sortedClasses$: Observable<ClassModel[]>;
  constructor() { }
  debug(item) {
    console.log(item);
  }
  ngOnInit(): void {
    this.sortedClasses$ = this.classes.pipe(
      map(classArr => {
        console.log('b4' + JSON.stringify(classArr, null, 2));
        let temp = classArr.sort(this.sortingFn);
        console.log('AFTER' + JSON.stringify(temp, null, 2));
        return temp;
      })
    );
  }

  sortingFn(a, b) {
    if (a.name.length != b.name.length) {
      return a.name.length > b.name.length ? 1 : -1;
    } else {
      return a.name > b.name ? 1 : -1;
    }
  }

  processClicked(classItem: ClassModel, el?: ElementRef) {
    // console.log('click');
    // console.log(el);

    this.classClicked.emit(classItem);
  }
}

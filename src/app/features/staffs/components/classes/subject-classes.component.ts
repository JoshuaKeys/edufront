import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef
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
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubjectClassesComponent implements OnInit, OnChanges {
  @Input() classes: Observable<ClassModel[]>;
  @Output() classClicked = new EventEmitter<ClassModel>();
  @Input() style: ClassesStyle;

  sortedClasses$: Observable<ClassModel[]>;
  ngOnInit(): void {
    this.sortedClasses$ = this.sortClasses(this.classes)
  }
  sortClasses(classes: Observable<ClassModel[]>) {
    return classes.pipe(
      map(classArr => {
        let temp = classArr.sort(this.sortingFn);
        return temp;
      })
    );
  }
  ngOnChanges(changes: SimpleChanges) {
    this.classes = changes.classes.currentValue;
    this.sortedClasses$ = this.sortClasses(this.classes)
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

import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ClassModel } from 'src/app/shared/models/class.model';
import { ClassesStyle } from 'src/app/shared/components/classes/classes.component';
import { Observable } from 'rxjs';
import { TeachingStateModel } from '../../models/teaching-state.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'edu-class-update',
  templateUrl: './class-update.component.html',
  styleUrls: ['./class-update.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassUpdateComponent implements OnInit {

  @Input() classes: ClassModel[];
  @Output() classClicked = new EventEmitter<string>();
  @Input() style: ClassesStyle;
  @Input() teachingState: Observable<TeachingStateModel>;
  sortedClasses$: Observable<ClassModel[]>;
  constructor() {}
  ngOnInit(): void {
    this.sortedClasses$ = this.teachingState.pipe(
      map(classes=> {
        console.log(classes.calendarEdit.classes.slice().sort(this.sortingFn));
        return classes.calendarEdit.classes.slice().sort(this.sortingFn)
      })
    ) //this.classes.slice().sort(this.sortingFn);
    // this.teachingState.subscribe(x => console.log(x, 'yyyyyyyyyyyyyyy'))
    this.sortedClasses$.subscribe(x=> console.log('xxxxxxx', x))
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

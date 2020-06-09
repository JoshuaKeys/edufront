import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassModel } from 'src/app/shared/models/class.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'edu-school-classes-card',
  templateUrl: './school-classes-card.component.html',
  styleUrls: ['./school-classes-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolClassesCardComponent implements OnInit {
  @Input() selectedClasses: Observable<ClassModel[]>;
  sortedSelectedClasses: Observable<ClassModel[]>;
  constructor() { }

  ngOnInit(): void {
    this.sortedSelectedClasses = this.selectedClasses.pipe(
      map(selectedClasses => selectedClasses.sort((a, b) => a.grade - b.grade))
    );
  }

}

import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassModel } from 'src/app/shared/models/class.model';

@Component({
  selector: 'edu-school-classes-card',
  templateUrl: './school-classes-card.component.html',
  styleUrls: ['./school-classes-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolClassesCardComponent implements OnInit {
  @Input() selectedClasses: Observable<ClassModel[]>;
  constructor() { }

  ngOnInit(): void {

  }

}

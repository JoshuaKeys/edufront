import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { SubjectModel } from '../../models/subject.model';

@Component({
  selector: 'edu-subjects-list',
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubjectsListComponent implements OnInit {
  @Input() allSubjects: SubjectModel[];
  constructor() { }

  ngOnInit(): void {
  }

}

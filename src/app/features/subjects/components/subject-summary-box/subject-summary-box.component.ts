import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { ClassModel } from 'src/app/shared/models/class.model';
import { SubjectModel } from 'src/app/shared/models/subject.model';

@Component({
  selector: 'edu-subject-summary-box',
  templateUrl: './subject-summary-box.component.html',
  styleUrls: ['./subject-summary-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubjectSummaryBoxComponent implements OnInit {
  @Input() class: ClassModel;
  subjects: SubjectModel[];
  constructor() { }
  ngOnInit(): void {
    this.subjects = this.class.subjects ? this.class.subjects : [];
  }

}

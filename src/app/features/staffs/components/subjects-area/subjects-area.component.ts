import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ClassModel } from 'src/app/shared/models/class.model';
import { Observable } from 'rxjs';
import { SubjectModel } from 'src/app/shared/models/_subject.model';

@Component({
  selector: 'edu-subjects-area',
  templateUrl: './subjects-area.component.html',
  styleUrls: ['./subjects-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubjectsAreaComponent implements OnInit {
  isOpen = false;
  @Input() classes: Observable<ClassModel[]>;
  @Input() subjects: Observable<SubjectModel[]>;
  constructor() { }

  ngOnInit(): void {
  }
  toggleSubjectClassesBox() {
    this.isOpen = !this.isOpen;
  }
}

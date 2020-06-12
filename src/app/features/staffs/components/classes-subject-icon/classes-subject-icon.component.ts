import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { SelectableSubjectModel } from 'src/app/shared/models/selectable-subject.model';
import { Observable } from 'rxjs';
import { SubjectClassesAssociation } from '../../models/subject-classes-association.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'edu-classes-subject-icon',
  templateUrl: './classes-subject-icon.component.html',
  styleUrls: ['./classes-subject-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassesSubjectIconComponent implements OnInit {
  @Input() subjects: Observable<SelectableSubjectModel[]>;
  @Input() association: SubjectClassesAssociation;
  @Output() onClick = new EventEmitter<SelectableSubjectModel>();
  subject: Observable<{ title: string; classes: string[] }>;
  constructor() {}
  handleClick() {
    // this.onClick.emit(this.subject)
  }
  ngOnInit(): void {
    this.subject = this.subjects.pipe(
      map(subjects => {
        let newAssociation;
        for (let i = 0; i < subjects.length; i++) {
          if (this.association.subjectId === subjects[i].id) {
            newAssociation = {
              title: subjects[i].title,
              classes: this.association.classes.map(classItem => classItem.name)
            };
          }
        }
        return newAssociation;
      })
    );
  }
}

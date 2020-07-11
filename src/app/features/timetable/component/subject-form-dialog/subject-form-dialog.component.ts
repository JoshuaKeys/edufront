import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TimetableFacadeService } from '../../services/timetable-facade.service';
import { CreateSubjModel } from 'src/app/shared/models/create-subject.model';
import { DialogRef } from 'src/app/shared/components/generic-dialog/dialog-ref';
import { take } from 'rxjs/operators';

@Component({
  selector: 'edu-subject-form-dialog',
  templateUrl: './subject-form-dialog.component.html',
  styleUrls: ['./subject-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubjectFormDialogComponent implements OnInit {
  constructor(
    private timetableFacade: TimetableFacadeService,
    public dialogRef: DialogRef<SubjectFormDialogComponent>
  ) {}

  ngOnInit(): void {}

  onSubjectCreate(subject) {
    const subSubjects = subject.subSubjects.filter(
      subSubject => subSubject.title !== null
    );
    const clearedSubject: CreateSubjModel = { ...subject, subSubjects };
    this.timetableFacade.createSubjectRequest(clearedSubject);
    this.timetableFacade.subjectCreated$.pipe(take(1)).subscribe(isCreated => {
      this.dialogRef.close();
    });
  }
}

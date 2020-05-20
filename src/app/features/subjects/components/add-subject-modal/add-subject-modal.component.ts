import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { CreateSubjModel } from '../../models/create-subject.model';

@Component({
  selector: 'edu-add-subject-modal',
  templateUrl: './add-subject-modal.component.html',
  styleUrls: ['./add-subject-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddSubjectModalComponent implements OnInit {
  @Output() createSubject = new EventEmitter<CreateSubjModel>()
  constructor() { }
  onCreateSubject(event: CreateSubjModel) {
    this.createSubject.emit(event)
  }
  ngOnInit(): void {
  }

}

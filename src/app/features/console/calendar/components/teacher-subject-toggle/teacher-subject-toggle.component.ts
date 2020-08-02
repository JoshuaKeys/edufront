import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-teacher-subject-toggle',
  templateUrl: './teacher-subject-toggle.component.html',
  styleUrls: ['./teacher-subject-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeacherSubjectToggleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

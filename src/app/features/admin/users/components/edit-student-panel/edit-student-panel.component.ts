import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-edit-student-panel',
  templateUrl: './edit-student-panel.component.html',
  styleUrls: ['./edit-student-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditStudentPanelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

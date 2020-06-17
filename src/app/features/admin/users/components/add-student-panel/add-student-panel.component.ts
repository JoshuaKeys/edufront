import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-add-student-panel',
  templateUrl: './add-student-panel.component.html',
  styleUrls: ['./add-student-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddStudentPanelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

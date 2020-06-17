import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-students-tab',
  templateUrl: './students-tab.component.html',
  styleUrls: ['./students-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentsTabComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

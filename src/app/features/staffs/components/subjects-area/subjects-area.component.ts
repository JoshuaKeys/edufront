import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-subjects-area',
  templateUrl: './subjects-area.component.html',
  styleUrls: ['./subjects-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubjectsAreaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-subjects-list',
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubjectsListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

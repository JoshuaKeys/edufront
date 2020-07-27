import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-sections-subjects-box',
  templateUrl: './sections-subjects-box.component.html',
  styleUrls: ['./sections-subjects-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionsSubjectsBoxComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

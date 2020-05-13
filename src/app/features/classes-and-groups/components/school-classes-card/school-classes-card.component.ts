import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-school-classes-card',
  templateUrl: './school-classes-card.component.html',
  styleUrls: ['./school-classes-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolClassesCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

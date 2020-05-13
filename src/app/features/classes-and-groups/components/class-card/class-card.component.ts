import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'edu-class-card',
  templateUrl: './class-card.component.html',
  styleUrls: ['./class-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassCardComponent implements OnInit {
  @Input() groupsOfClassesQty: number;
  constructor() { }

  ngOnInit(): void {
    console.log(this.groupsOfClassesQty)
  }

}

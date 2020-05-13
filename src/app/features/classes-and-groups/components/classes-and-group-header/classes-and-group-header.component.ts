import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-classes-and-group-header',
  templateUrl: './classes-and-group-header.component.html',
  styleUrls: ['./classes-and-group-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassesAndGroupHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

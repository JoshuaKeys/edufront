import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-classes-and-groups-shell',
  templateUrl: './classes-and-groups-shell.component.html',
  styleUrls: ['./classes-and-groups-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassesAndGroupsShellComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

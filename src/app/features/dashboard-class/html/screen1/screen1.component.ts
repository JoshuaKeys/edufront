import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-screen1',
  templateUrl: './screen1.component.html',
  styleUrls: ['./screen1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Screen1Component implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  badgeArr = new Array(9).fill('');
  dropZoneArr = [
    { title: 'primary', popoverIsOpened: false },
    { title: 'middle', popoverIsOpened: false },
    { title: 'secondary', popoverIsOpened: false },
    { title: 'higher secondary', popoverIsOpened: false }
  ];
}

import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'edu-class-item',
  templateUrl: './class-item.component.html',
  styleUrls: ['./class-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassItemComponent implements OnInit {
  @Input() style: {
    width: string;
    height: string;
  };
  @Input() active: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}

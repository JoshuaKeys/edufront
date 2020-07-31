import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'edu-section-item',
  templateUrl: './section-item.component.html',
  styleUrls: ['./section-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionItemComponent implements OnInit {
  @Input() style: {
    width: string;
    height: string;
  }
  constructor() { }

  ngOnInit(): void {
  }

}

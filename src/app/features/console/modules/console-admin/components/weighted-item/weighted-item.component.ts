import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { WeightModel } from '../../models/weight.model';

@Component({
  selector: 'edu-weighted-item',
  templateUrl: './weighted-item.component.html',
  styleUrls: ['./weighted-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeightedItemComponent implements OnInit {
  @Input() weight: WeightModel;
  @Input() subWeights: WeightModel[]
  @Input() withIcon: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}

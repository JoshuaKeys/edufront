import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { WeightModel } from '../../models/weight.model';

@Component({
  selector: 'edu-sub-weighted-item',
  templateUrl: './sub-weighted-item.component.html',
  styleUrls: ['./sub-weighted-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubWeightedItemComponent implements OnInit {
  @Input() subWeights: WeightModel[];
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'radial-progress',
  templateUrl: './radial-progress.component.html',
  styleUrls: ['./radial-progress.component.scss']
})
export class RadialProgressComponent implements OnInit {
  isBig: boolean = true;
  @Input() value: number;
  color: string = '#68a9f3';

  constructor() {}

  ngOnInit() {}
}

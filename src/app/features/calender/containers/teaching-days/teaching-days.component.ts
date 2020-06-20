import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-teaching-days',
  templateUrl: './teaching-days.component.html',
  styleUrls: ['./teaching-days.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeachingDaysComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  goNext(){
    
  }
}

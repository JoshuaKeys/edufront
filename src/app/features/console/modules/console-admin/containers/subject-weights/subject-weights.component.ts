import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-subject-weights',
  templateUrl: './subject-weights.component.html',
  styleUrls: ['./subject-weights.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubjectWeightsComponent implements OnInit {
  values = [
    '1', '2', '3', '4',
    '5', '6', '7', '8',
    '9', '10', '11', '12'
  ]
  sections = [
    'A', 'B', 'C', 'D',
    'E'
  ]
  weights = [
    { weight: 1, subject: 'Maths' },
    { weight: 1, subject: 'Physics' },
    { weight: 1, subject: 'Biology' },
    { weight: 1, subject: 'Economics' },
    { weight: 1, subject: 'Ecology' },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}

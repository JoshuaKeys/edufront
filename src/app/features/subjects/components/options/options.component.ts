import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ClassModel } from 'src/app/shared/models/class.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'edu-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionsComponent implements OnInit {
  @Input() classes: Observable<ClassModel[]>
  @Output() clicked = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

}

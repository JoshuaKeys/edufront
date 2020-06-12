import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';

@Component({
  selector: 'edu-cb',
  templateUrl: './cb.component.html',
  styleUrls: ['./cb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CbComponent implements OnInit {
  @Output('valueChange') valueChangeEvent = new EventEmitter();
  @Input('id') id;
  @Input('initialValue') initialValue;
  constructor(private cd: ChangeDetectorRef) {}
  value;
  onBlur() {
    console.log('blurring and emmitting');
    this.valueChangeEvent.emit(this.value);
  }
  ngOnInit(): void {
    this.value = this.initialValue;
  }
}

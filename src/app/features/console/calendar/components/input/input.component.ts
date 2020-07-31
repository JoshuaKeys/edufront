import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'edu-substitute-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit {
  @Input() type: 'teacher' | 'datepicker';
  @Input() value = null;
  @Output() update = new EventEmitter();
  @Output() edit = new EventEmitter();
  ctrl = new FormControl('');
  constructor() {}

  ngOnInit(): void {
    this.ctrl.valueChanges.pipe(debounceTime(130)).subscribe(value => {
      this.update.emit(value);
    });
    if (this.value) {
      this.ctrl.patchValue(this.value, {
        emitEvent: false,
        onlySelf: true
      });
    }
  }

  onEdit() {
    this.edit.emit(this.value);
  }
}

import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  forwardRef,
  Renderer2,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'edu-timetable-subject-icon-field',
  templateUrl: './subject-icon-field.component.html',
  styleUrls: ['./subject-icon-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SubjectIconFieldComponent)
    }
  ]
})
export class SubjectIconFieldComponent implements OnInit, ControlValueAccessor {
  constructor(private renderer: Renderer2, private cd: ChangeDetectorRef) {}
  _value;
  set value(val) {
    this._value = val;
    this.cd.markForCheck();
  }
  get value() {
    return this._value;
  }
  @ViewChild('subjectName') subjectName;
  onValueChange: (text: string) => any;
  ngOnInit(): void {}
  isChecked = false;
  isFocused = false;
  popoverToogle = false;
  writeValue(val: any) {
    if (val === null) {
      this.value = '';
    }
    this.value = val;
  }
  focusSearch() {
    this.isChecked = true;
    // this.isFocused = true;
  }
  blurSearch() {
    // this.isChecked = true;
  }
  registerOnChange(fn: any) {
    this.onValueChange = fn;
  }
  registerOnTouched(fn: any) {}

  onTextChange(event) {
    this.onValueChange(event.target.value);
  }

  closePopover() {
    this.popoverToogle = !this.popoverToogle;
    this.isChecked = false;
  }
}

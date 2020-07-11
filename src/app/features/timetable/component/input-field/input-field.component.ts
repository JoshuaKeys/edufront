import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  Renderer2,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'edu-timetable-array-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ArrayInputFieldComponent),
      multi: true
    }
  ]
})
export class ArrayInputFieldComponent implements OnInit, ControlValueAccessor {
  @Input() index: number;
  @Input() last: boolean;
  @Input() text: string;
  @Input() idPrefix: string;
  @Input() type: string;

  @Output() insertItem = new EventEmitter<{ type: string; pos: number }>();
  @Output() removeItem = new EventEmitter<{ type: string; pos: number }>();

  @ViewChild('subSubjectValue') subSubjectsValue;
  inputValue: string; //cant use inputValue for controlValueAccessor as Angualr looks specifically for [this.value]
  _value;
  set value(val) {
    this._value = val;
    this.cd.markForCheck();
  }
  get value() {
    return this._value;
  }
  onValueChange: (value: string) => any;
  constructor(private renderer: Renderer2, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}
  writeValue(val: string) {
    this.value = val;
    // if (val === null) {
    //   this.renderer.setProperty(
    //     this.subSubjectsValue.el.nativeElement,
    //     'value',
    //     ''
    //   );
    // }
    // this.inputValue = val;
  }
  registerOnChange(fn: any) {
    this.onValueChange = fn;
  }
  registerOnTouched(fn: any) {}
  onTextChange(event) {
    // console.log('asdsa');
    this.onValueChange(event.target.value);
  }
  add(type: string, pos: number) {
    // console.log(this.subSubjectsValue);
    if (!this.subSubjectsValue.value) {
      return;
    }
    this.insertItem.emit({ type, pos });
  }
  remove(type: string, pos: number) {
    this.removeItem.emit({ type, pos });
  }
}

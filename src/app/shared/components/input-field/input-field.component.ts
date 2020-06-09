import { Component, OnInit, ChangeDetectionStrategy, Renderer2, ViewChild, Output, Input, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'edu-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => InputFieldComponent) }
  ]
})
export class InputFieldComponent implements OnInit, ControlValueAccessor {
  @Input() index: number;
  @Input() last: boolean;
  @Input() text: string;
  @Input() idPrefix: string;
  @Input() type: string;
  @Input() disabled: boolean;

  @Output() onChange = new EventEmitter<{ name: string, value: string }>()

  @ViewChild('inputField') inputField;
  inputValue: string;
  onValueChange: (value: string) => any
  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {

  }
  writeValue(val: string) {
    if (val === null) {
      setTimeout(() => {
        this.renderer.setProperty(this.inputField.nativeElement, 'value', '')
      }, 0)

    }
    this.inputValue = val;
  }
  registerOnChange(fn: any) {
    this.onValueChange = fn;
  }
  registerOnTouched(fn: any) {

  }
  onTextChange(event) {
    this.onValueChange(event.target.value);
    this.onChange.emit({ name: this.idPrefix, value: event.target.value })
  }
}

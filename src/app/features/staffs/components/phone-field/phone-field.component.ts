import { Component, OnInit, ChangeDetectionStrategy, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { IconModel } from 'src/app/shared/components/icon-field/icon-field.component';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { PhoneIconModel } from 'src/app/shared/models/phone-icon.model';

@Component({
  selector: 'edu-phone-field',
  templateUrl: './phone-field.component.html',
  styleUrls: ['./phone-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => PhoneFieldComponent) }
  ]
})
export class PhoneFieldComponent implements OnInit, ControlValueAccessor {
  isOpen = false;
  @Input() phonePrefix: string;
  @Input() icons: PhoneIconModel[];
  @Input() fieldName: string;
  activeIcon: string;
  value: string;
  item: string;
  @Output() valueChanged = new EventEmitter<PhoneIconModel>()
  writeValue(val: PhoneIconModel) {
    if (val === null || val == undefined) {
      this.activeIcon = this.icons[0].icon;
      this.phonePrefix = this.icons[0].phonePrefix
      this.item = this.icons[0].item;
      this.value = '';
      return;
    }
    this.value = val.phoneNum ? val.phoneNum : '';
    this.phonePrefix = val.phonePrefix;
    this.activeIcon = val.icon;
    this.item = val.item;
  }
  registerOnChange() {

  }
  registerOnTouched() {

  }
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
  changeItem(icon) {
    const iconCopy = { ...icon };
    iconCopy.phoneNum = this.value;
    this.valueChanged.emit(iconCopy)
    this.toggleDropdown();
  }
  processClick() {

  }
  onTextChange(event) {

  }
  ngOnInit(): void {
  }
  constructor() { }
}

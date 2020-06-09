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
  icon: PhoneIconModel;
  filteredIcons: PhoneIconModel[];
  filter = ''
  @Output() valueChanged = new EventEmitter<PhoneIconModel>()
  writeValue(val: PhoneIconModel) {
    if (val === null || val == undefined) {
      this.activeIcon = this.icons[0].icon;
      this.phonePrefix = this.icons[0].phonePrefix
      this.item = this.icons[0].item;
      this.value = '';
      this.icon = val;
      return;
    }
    this.icon = val;
    this.value = val.phoneNum ? val.phoneNum : '';
    this.phonePrefix = val.phonePrefix;
    this.activeIcon = val.icon;
    this.item = val.item;
  }
  onSearchInputChange(input: InputEvent) {
    this.filteredIcons = this.filterIcons(this.icons, input.target['value'])
  }
  registerOnChange() {

  }
  registerOnTouched() {

  }
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
  changeItem(icon: PhoneIconModel) {
    const iconCopy = { ...this.icon, ...icon };
    iconCopy.phoneNum = this.value;
    this.icon = iconCopy;
    this.valueChanged.emit(this.icon)
    this.toggleDropdown();
  }
  processClick() {

  }
  onTextChange(event) {
    const iconCopy: PhoneIconModel = { ...this.icon, phoneNum: event.target.value };
    this.icon = iconCopy;
    this.valueChanged.emit(this.icon)
  }
  ngOnInit(): void {
    this.filteredIcons = this.filterIcons(this.icons, this.filter)
  }
  filterIcons(icons: PhoneIconModel[], filter: string) {
    return icons.filter(icon => icon.item.match(filter))
  }
  constructor() { }
}

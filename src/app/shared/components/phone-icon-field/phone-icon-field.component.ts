import { Component, OnInit, ChangeDetectionStrategy, Input, Renderer2, EventEmitter, ElementRef, Output, ViewChild, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { PhoneIconModel } from '../../models/phone-icon.model';

@Component({
  selector: 'edu-phone-icon-field',
  templateUrl: './phone-icon-field.component.html',
  styleUrls: ['./phone-icon-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => PhoneIconFieldComponent) }
  ]
})
export class PhoneIconFieldComponent implements OnInit {
  @Input() fieldName: string;
  @Input() icons: PhoneIconModel[]
  @Input() mode: string;
  isOpen = false;
  constructor(private renderer: Renderer2) { }
  value: string;
  activeIcon: string;
  phonePrefix: string;
  item: string;
  filter = '';
  filteredIcons: PhoneIconModel[]
  @Output() valueChanged = new EventEmitter<PhoneIconModel>();
  @ViewChild('fieldNameEl') fieldNameEl: ElementRef<HTMLInputElement>;
  onValueChange: (any) => any;
  ngOnInit(): void {
    this.filteredIcons = this.filterIcons(this.icons, this.filter);
  }
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
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
  filterIcons(icons: PhoneIconModel[], filter: string) {
    return icons.filter(icon => icon.item.match(filter))
  }
  onSearchItems(input) {
    this.filteredIcons = this.filterIcons(this.icons, input.target.value)
  }
  changeItem(icon: PhoneIconModel) {
    const iconCopy = { ...icon };
    iconCopy.phoneNum = this.value;
    this.onValueChange(iconCopy);
    this.valueChanged.emit(iconCopy);
    this.toggleDropdown();
  }
  registerOnChange(fn: any) {
    this.onValueChange = fn;
  }
  registerOnTouched(fn: any) { }

  processClick() {
    if (this.mode === 'select') {
      this.toggleDropdown()
    }
  }
  onTextChange(event) {
    if (this.mode === 'select') {
      this.renderer.setProperty(this.fieldNameEl.nativeElement, 'value', this.value);
      return;
    }
    this.onValueChange(this.getEventData(this.activeIcon))
    this.valueChanged.emit(this.getEventData(this.activeIcon))
  }
  getEventData(icon): PhoneIconModel {
    return {
      icon,
      phonePrefix: this.phonePrefix,
      phoneNum: this.fieldNameEl.nativeElement.value,
      item: this.item,
      name: this.fieldName.toLowerCase()
    };
  }
}

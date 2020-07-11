import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Renderer2,
  EventEmitter,
  ElementRef,
  Output,
  ViewChild,
  forwardRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { PhoneIconModel } from '../../models/phone-icon.model';

@Component({
  selector: 'edu-phone-icon-field',
  templateUrl: './phone-icon-field.component.html',
  styleUrls: ['./phone-icon-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => PhoneIconFieldComponent)
    }
  ]
})
export class PhoneIconFieldComponent implements OnInit {
  @Input() fieldName: string;
  @Input() alignment: string = 'center';
  @Input() icons: PhoneIconModel[];
  @Input() mode: string;
  isOpen = false;
  phoneNumber = '';
  constructor(private renderer: Renderer2) { }
  value: string;
  activeIcon: string;
  phonePrefix: string;
  item: string;
  filter = '';
  popOverIsOpened = false;
  id: string;
  filteredIcons: PhoneIconModel[];
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
    console.log(val);
    if (val === null || val == undefined) {
      this.activeIcon = this.icons[0].icon;
      this.phonePrefix = this.icons[0].phonePrefix;
      this.item = this.icons[0].item;
      this.phoneNumber = '';
      this.valueChanged.emit({ icon: this.activeIcon, phoneNum: this.phoneNumber, phonePrefix: this.phonePrefix, id: this.icons[0].id })
      return;
    }
    this.phoneNumber = val.phoneNum ? val.phoneNum : '';
    this.phonePrefix = val.phonePrefix;
    this.activeIcon = val.icon;
    this.item = val.item;
    this.id = val.id;
  }
  filterIcons(icons: PhoneIconModel[], filter: string) {
    console.log(filter);
    return icons.filter(icon =>
      icon.item.toLowerCase().indexOf(filter.toLowerCase()) > -1 //.match(filter.toLowerCase())
    );
  }
  removeSpecialChars(str) {

  }
  onSearchItems(input) {
    this.filteredIcons = this.filterIcons(this.icons, input.target.value);
  }
  changeItem(icon: PhoneIconModel) {
    console.log(icon);
    const iconCopy = { ...icon };
    iconCopy.phoneNum = this.phoneNumber;
    this.onValueChange(iconCopy);
    this.valueChanged.emit(iconCopy);
    this.toggleDropdown();
    this.popOverIsOpened = !this.popOverIsOpened;
  }
  registerOnChange(fn: any) {
    this.onValueChange = fn;
  }
  registerOnTouched(fn: any) { }

  processClick() {
    if (this.mode === 'select') {
      this.toggleDropdown();
    }
  }
  onTextChange(event) {
    console.log(event);
    if (this.mode === 'select') {
      this.renderer.setProperty(
        this.fieldNameEl.nativeElement,
        'value',
        this.phoneNumber
      );
      return;
    }
    this.onValueChange(this.getEventData(this.activeIcon, event));
    this.valueChanged.emit(this.getEventData(this.activeIcon, event));
  }
  getEventData(icon, phoneNum): PhoneIconModel {
    return {
      icon,
      phonePrefix: this.phonePrefix,
      phoneNum,
      item: this.item,
      name: this.fieldName.toLowerCase(),
      id: this.id
    };
  }
}

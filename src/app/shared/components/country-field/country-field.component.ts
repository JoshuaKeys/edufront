import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
  forwardRef,
  ViewChild,
  ElementRef,
  Renderer2
} from '@angular/core';
import { PhoneIconModel } from 'src/app/shared/models/phone-icon.model';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconModel } from 'src/app/shared/components/icon-field/icon-field.component';

@Component({
  selector: 'edu-country-field',
  templateUrl: './country-field.component.html',
  styleUrls: ['./country-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CountryFieldComponent)
    }
  ]
})
export class CountryFieldComponent {
  @Input() fieldName: string;
  @Input() icons: IconModel[];
  @Input() mode: string;
  isOpen = false;
  constructor(private renderer: Renderer2) {}
  value: string;
  activeIcon: string;
  @Output() valueChanged = new EventEmitter<IconModel>();
  @ViewChild('fieldNameEl') fieldNameEl: ElementRef<HTMLInputElement>;
  onValueChange: (any) => any;
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
  writeValue(val: IconModel) {
    console.log('called');
    if (val === null) {
      setTimeout(() => {
        this.renderer.setProperty(this.fieldNameEl.nativeElement, 'value', '');
      }, 0);

      this.activeIcon = this.icons[0].icon;
      return;
    }
    this.value = val.item;
    this.activeIcon = val.icon;
  }
  changeItem(icon: { item: string; icon: string; id: string }) {
    this.onValueChange(icon);
    this.valueChanged.emit(icon);
    this.toggleDropdown();
  }
  registerOnChange(fn: any) {
    this.onValueChange = fn;
  }
  registerOnTouched(fn: any) {}

  processClick() {
    if (this.mode === 'select') {
      this.toggleDropdown();
    }
  }
  onTextChange(event) {
    if (this.mode === 'select') {
      this.renderer.setProperty(
        this.fieldNameEl.nativeElement,
        'value',
        this.value
      );
      return;
    }
    this.onValueChange(event);
    this.valueChanged.emit(event);
  }
}

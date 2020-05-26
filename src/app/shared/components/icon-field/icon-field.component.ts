import { Component, OnInit, ChangeDetectionStrategy, forwardRef, Renderer2, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface IconModel {
  item: string;
  icon: string;
  id: string;
}
@Component({
  selector: 'edu-icon-field',
  templateUrl: './icon-field.component.html',
  styleUrls: ['./icon-field.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => IconFieldComponent) }
  ]
})
export class IconFieldComponent implements OnInit, ControlValueAccessor {
  @Input() fieldName: string;
  @Input() icons: IconModel[]
  @Input() mode: string;
  isOpen = false;
  constructor(private renderer: Renderer2) { }
  value: string;
  activeIcon: string;
  @Output() valueChanged = new EventEmitter<IconModel>();
  @ViewChild('fieldNameEl') fieldNameEl: ElementRef<HTMLInputElement>;
  onValueChange: (any) => any;
  ngOnInit(): void {
    console.log(this.fieldName)
    console.log(this.icons)
  }
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
  writeValue(val: IconModel) {
    console.log('called');
    if (val === null) {
      console.log('true')
      setTimeout(() => { this.renderer.setProperty(this.fieldNameEl.nativeElement, 'value', ''); }, 0)

      this.activeIcon = this.icons[0].icon;
      return;
    }
    this.value = val.item;
    this.activeIcon = val.icon;
  }
  changeItem(icon: { item: string, icon: string, id: string }) {
    this.onValueChange(icon)
    this.valueChanged.emit(icon)
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
    // this.onValueChange(event.target.value);
    if (this.mode === 'select') {
      this.renderer.setProperty(this.fieldNameEl.nativeElement, 'value', this.value);
      return;
    }
    this.onValueChange(event)
    this.valueChanged.emit(event)


  }
}

import { Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit, Renderer2, forwardRef, Output, EventEmitter, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'edu-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CustomSelectComponent),
    }
  ]
})
export class CustomSelectComponent {

  @Output() onQtyChange = new EventEmitter<number>();
  @ViewChild('formInputSelect') formInputSelect;
  isOpen = false;
  @Input() groupQty: number;
  setGroupQty(num) {
    // this.groupQty = num;
    this.onQtyChange.emit(num);
    this.closeDropdown()
  }
  openDropDown() {
    this.isOpen = true;
  }
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
  closeDropdown() {
    this.isOpen = false;
  }

  constructor(private renderer: Renderer2) { }
}

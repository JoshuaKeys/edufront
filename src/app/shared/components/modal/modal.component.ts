import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ElementRef,
  Renderer2,
  forwardRef,
  ChangeDetectorRef
} from '@angular/core';
import { addClassToSubjectRequest } from 'src/app/features/staffs/ngrx/actions';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'edu-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ModalComponent)
    }
  ]
})
export class ModalComponent implements OnInit, ControlValueAccessor {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit() {}
  _value = false;
  @Input('value') set value(param: boolean) {
    this._value = param;
    if (param) {
      this.renderer.addClass(this.el.nativeElement, 'active');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'active');
    }
    this.cd.markForCheck();
  }

  get value() {
    return this._value;
  }
  closeModal() {
    this.value = false;
    // this.renderer.removeClass(this.el.nativeElement, 'active');
    this.onChange(false);
    console.log('close modal ? ');
  }

  onChange: any = () => {};
  onTouched: any = () => {};
  disabled = false;
  writeValue(value: any) {
    // console.log('write value -- ' + value);
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    // if (this.isDisabled != undefined) {
    //   this.disabled = this.isDisabled;
    // }
  }
}

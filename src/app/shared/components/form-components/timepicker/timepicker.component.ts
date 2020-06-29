import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  ChangeDetectionStrategy,
  AfterViewInit,
  forwardRef,
  ChangeDetectorRef,
  ViewChild
} from '@angular/core';
import { Renderer2, ElementRef } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PopoverComponent } from '../popover/popover.component';
@Component({
  selector: 'edu-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TimepickerComponent)
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimepickerComponent
  implements OnInit, AfterViewInit, ControlValueAccessor {
  @Output() onValueChange = new EventEmitter<any>();
  @Input('alignment') alignment = 'center'; //left right center
  @Input('disabled') disabled = false;
  @Input('elementId') elementId = 'timepicker';
  @Output('edu-tick') onTick = new EventEmitter<any>();
  @ViewChild(PopoverComponent) popover: PopoverComponent;

  displayText = '';
  value;
  elState;
  popoverToogleVar = false;
  hour = new Array(24);
  min = new Array(60);

  constructor(private cd: ChangeDetectorRef, private el: ElementRef) {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.popover.openEvent.subscribe(() => {
      console.log('popover event');
      this.elState = 'active';
      this.cd.markForCheck();
    });

    this.popover.closeEvent.subscribe(() => {
      console.log('popover event');
      this.elState = 'inactive';
      this.cd.markForCheck();
    });
  }
  setElementId() {
    let elId = this.el.nativeElement.getAttribute('formcontrolname');
    if (this.el != undefined) {
      this.elementId = elId;
    }
  }

  isLabelActive() {
    return (
      this.elState === 'active' || (this.displayText != '' && this.displayText)
    );
  }
  popoverClose() {}
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any) {
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
    this.elState = 'disabled';
    this.cd.markForCheck();
  }
}

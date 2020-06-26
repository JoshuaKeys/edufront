import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  ChangeDetectionStrategy,
  HostListener,
  forwardRef,
  ChangeDetectorRef,
  ContentChildren,
  QueryList,
  ContentChild,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { Renderer2, ElementRef } from '@angular/core';
import { SelectService } from '../../_shared/select.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OptionComponent } from '../../option/option.component';
import { PopoverComponent } from '../../popover/popover.component';
import { filter } from 'rxjs/operators';
// import { OptionValueDirective } from "../option-value.directive"

@Component({
  selector: 'edu-icon-select',
  templateUrl: './icon-select.component.html',
  styleUrls: ['./icon-select.component.scss'],
  providers: [
    SelectService,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => IconSelectComponent)
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconSelectComponent
  implements OnInit, AfterViewInit, ControlValueAccessor {
  @Output() onValueChange = new EventEmitter<any>();
  @Input('alignment') alignment = 'center'; //left right center
  @Input('disabled') disabled = false;
  @Input('valueOptions') valueOptions = [];
  @Input('displayValue') displayValue = '';
  @Output('edu-tick') onTick = new EventEmitter<any>();

  // @ContentChildren(OptionComponent) optionEls: QueryList<OptionComponent>;
  @ViewChild(PopoverComponent) popover: PopoverComponent;

  value = ''; //value that gets pushed out
  // inputValue = '';
  elementId;
  selectIsActive; // controls the checkbox, responsible for toggling dropdown
  selectState = 'inactive'; // state [active, inactive( default ), focus, disabled ]
  activeOptionIndex = 0;

  constructor(
    private selectService: SelectService,
    private cd: ChangeDetectorRef,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.setElementId();
  }

  ngAfterViewInit() {
    this.popover.openEvent.subscribe(() => {
      this.selectState = 'active';
      this.cd.markForCheck();
    });

    this.popover.closeEvent.subscribe(() => {
      this.selectState = 'inactive';
      this.cd.markForCheck();
    });
  }

  isLabelActive() {
    return (
      this.selectState === 'active' ||
      (this.displayValue != '' && this.displayValue)
    );
  }

  @HostListener('click', ['$event']) onClick($event) {
    $event.stopPropagation();
  }

  setElementId() {
    let elId = this.el.nativeElement.getAttribute('formcontrolname');
    if (this.el != undefined) {
      this.elementId = elId;
    }
  }

  //popover implementation

  // valueOptions = [
  //   { value: 1, display: 'P1', state: '' },
  //   { value: 2, display: 'P2', state: '' },
  //   { value: 3, display: 'P3', state: '' },
  //   { value: 4, display: 'P4', state: '' },
  //   { value: 5, display: 'P5', state: '' },
  //   { value: 6, display: 'P6', state: '' },
  //   { value: 7, display: 'P7', state: '' },
  //   { value: 8, display: 'P8', state: '' },
  //   { value: 9, display: 'P9', state: '' }
  // ];
  prevState = []; //temp for holding only
  popoverToogleVar = false;
  popoverOpen() {
    this.prevState = JSON.parse(JSON.stringify(this.valueOptions));
  }
  popoverClose() {
    this.valueOptions = JSON.parse(JSON.stringify(this.prevState));
  }
  confirmState() {
    this.prevState = JSON.parse(JSON.stringify(this.valueOptions));
    this.onTick.emit(this.prevState);
    this.popoverToogleVar = !this.popoverToogleVar;
  }

  setActiveBadge(index: number) {
    if (this.valueOptions[index].state === '') {
      this.valueOptions[index].state = 'active';
    } else {
      this.valueOptions[index].state = '';
    }
  }

  //Control value accessor implementation

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any) {
    console.log(JSON.stringify(value));
    this.selectService.setActiveValue(value);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.selectIsActive = false;
    this.disabled = isDisabled;
    this.selectState = 'disabled';
    this.cd.markForCheck();
  }
}

//for keyboard accessbility
// ENTER_KEY_CODE = 13;
// DOWN_ARROW_KEY_CODE = 40;
// UP_ARROW_KEY_CODE = 38;
// ESCAPE_KEY_CODE = 27;
// TAB_KEY_CODE = 9;

// keyboardEvent(keyCode, shiftPressed, event) {
//   let newIndex;
//   switch (keyCode) {
//     case this.ENTER_KEY_CODE:
//     case this.ESCAPE_KEY_CODE:
//     case this.DOWN_ARROW_KEY_CODE:
//     case this.UP_ARROW_KEY_CODE:
//       event.preventDefault();
//       break;
//   }

//   switch (keyCode) {
//     case this.ENTER_KEY_CODE:
//       if (this.selectState === 'focus') {
//         this.selectIsActive = true;
//         this.selectState = 'active';
//       } else if (this.selectState === 'active') {
//         this.selectIsActive = false;
//         this.selectState = 'focus';
//         // this.selectService.setActiveOption(this.optionEls.toArray()[this.activeOptionIndex].OptionValue);
//         // consol
//       }
//       break;

//     case this.ESCAPE_KEY_CODE:
//       this.selectIsActive = false;
//       this.selectState = 'focus';
//       break;

//     case this.DOWN_ARROW_KEY_CODE:
//       if (this.activeOptionIndex === null) {
//         newIndex = 0;
//       } else {
//         newIndex =
//           (this.activeOptionIndex + 1 + this.optionEls.length) %
//           this.optionEls.length;
//       }
//       this.selectService.activeOptionComponent.next(
//         this.optionEls.toArray()[newIndex]
//       );

//       break;

//     case this.UP_ARROW_KEY_CODE:
//       if (this.activeOptionIndex === null) {
//         newIndex = 0;
//       } else {
//         newIndex =
//           (this.activeOptionIndex - 1 + this.optionEls.length) %
//           this.optionEls.length;
//       }
//       this.selectService.activeOptionComponent.next(
//         this.optionEls.toArray()[newIndex]
//       );
//       break;
//   }
// }

// @HostListener('keydown', ['$event']) onKeydown($event) {
//stops propagation on lower layers
// this.keyboardEvent($event.keyCode, $event.shiftKey, $event);
// $event.preventDefault();
//need able this but include support for tab out
// $event.stopPropagation();
// }
// cbChange() {
//   if (this.selectIsActive) {
//     this.selectState = 'active';
//   } else if (this.el.nativeElement.contains(document.activeElement)) {
//     this.selectState = 'focus';
//   } else {
//     this.selectState = 'inactive';
//     // this.selectService.resetOptionIndex();
//   }

//   this.cd.markForCheck();
//   // console.log($event)
// }
// cbFocus() {
//   this.selectState = 'focus';
// }
// cbBlur() {
//   //change to rxjs operator later
//   setTimeout(() => {
//     if (!this.el.nativeElement.contains(document.activeElement)) {
//       console.log(document.activeElement);
//       // this.selectService.setActiveOption(this.optionEls.toArray()[this.activeOptionIndex].OptionValue);
//       // this.selectService.setElementIsOpenState(false);
//       this.selectState = 'inactive';
//       this.selectIsActive = false;
//       // this.selectService.resetOptionIndex();
//       this.onTouched();

//       this.cd.markForCheck();
//     }
//   }, 150);
// }

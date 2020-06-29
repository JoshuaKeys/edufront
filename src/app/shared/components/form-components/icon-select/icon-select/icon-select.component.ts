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
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { Renderer2, ElementRef } from '@angular/core';
import { SelectService } from '../../_shared/select.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PopoverComponent } from '../../popover/popover.component';

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
  // _valueOptions = [];
  // @Input('valueOptions') set valueOptions(param) {
  //   console.log('VALUEOPTIONS');
  //   console.log(param);
  //   this._valueOptions = param;
  //   this.displayBadges = param;
  //   console.log(this.displayBadges);
  // }
  // get valueOptions() {
  //   return this._valueOptions;
  // }

  @Input('textParserFn') textParserFn: Function = param => param;
  @Output('edu-tick') onTick = new EventEmitter<any>();

  // @ContentChildren(OptionComponent) optionEls: QueryList<OptionComponent>;
  @ViewChild(PopoverComponent) popover: PopoverComponent;
  displayText = '';
  _value: any = ''; //value that gets pushed out
  set value(param) {
    if (param == null || param == '') {
      param = [''];
    }
    this._value = param;
    this.setDisplayBadges(param);
    this.displayText = this.textParserFn(param);
    this.onChange(param);
    this.cd.markForCheck();
  }
  get value() {
    return this._value;
  }
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

  isAfterOnInit = false;

  ngOnInit() {
    this.setDisplayBadges(this.value);
    this.isAfterOnInit = true;
    this.setElementId();
  }

  ngAfterViewInit() {
    this.popover.openEvent.subscribe(() => {
      console.log('popover event');
      this.selectState = 'active';
      this.cd.markForCheck();
    });

    this.popover.closeEvent.subscribe(() => {
      console.log('popover event');
      this.selectState = 'inactive';
      this.cd.markForCheck();
    });
  }

  isLabelActive() {
    return (
      this.selectState === 'active' ||
      (this.displayText != '' && this.displayText)
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
  displayBadges = []; //
  tempDisplayBadges = []; //temp for holding only
  popoverToogleVar = false;
  setDisplayBadges(activeValues: any[]) {
    // console.log('Setting display state - ' + JSON.stringify(activeValues));
    this.displayBadges = this.valueOptions.map(option => {
      let state = { state: '' };
      state.state = activeValues.indexOf(option.value) == -1 ? '' : 'active';

      return { ...option, ...state };
    });
    // console.log(JSON.stringify(this.displayBadges));
    this.tempDisplayBadges = JSON.parse(JSON.stringify(this.displayBadges));
  }

  popoverOpen() {
    // console.log('popover opening - \n' + JSON.stringify(this.displayBadges));
    this.tempDisplayBadges = JSON.parse(JSON.stringify(this.displayBadges));
    this.cd.markForCheck();
  }
  popoverClose() {
    // console.log('popover closing - \n' + JSON.stringify(this.tempDisplayBadges));
    this.displayBadges = JSON.parse(JSON.stringify(this.tempDisplayBadges));
    let activeArr = this.displayBadges
      .filter(badge => badge.state == 'active')
      .map(badge => badge.value);
    this.displayText = this.textParserFn(activeArr);
    this.cd.markForCheck();
  }
  confirmState() {
    this.popoverToogleVar = !this.popoverToogleVar;

    this.value = this.displayBadges
      .filter(option => option.state == 'active')
      .map(option => option.value);
    this.onTick.emit(this.value);
    // console.log(this.value);
  }

  getAllBadgeIndex() {
    let index = -1;
    this.displayBadges.forEach((badge, badgeIndex) => {
      let value = badge.value;
      if (typeof value == 'string' && value.toLowerCase().trim() === 'all') {
        index = badgeIndex;
        return index;
      }
    });

    return index;
  }

  setActiveBadge(index: number) {
    // can put in oninit or a setter later
    let allBadgeIndex = this.getAllBadgeIndex();

    if (allBadgeIndex === index) {
      let allIsInactive = this.displayBadges[index].state !== 'active';
      if (allIsInactive) {
        this.displayBadges.forEach((badge, badgeIndex) => {
          if (badgeIndex !== allBadgeIndex) {
            this.displayBadges[badgeIndex].state = '';
          }
        });
      }
    } else {
      if (allBadgeIndex != -1) {
        this.displayBadges[allBadgeIndex].state = '';
      }
    }

    if (this.displayBadges) {
      if (this.displayBadges[index].state === '') {
        this.displayBadges[index].state = 'active';
      } else {
        this.displayBadges[index].state = '';
      }
    }

    let activeArr = this.displayBadges
      .filter(badge => badge.state === 'active')
      .map(badge => badge.value);

    this.displayText = this.textParserFn(activeArr);
  }

  //Control value accessor implementation

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

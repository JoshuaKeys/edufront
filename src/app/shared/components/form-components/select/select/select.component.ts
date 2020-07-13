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
  ViewChild,
  ContentChildren,
  QueryList,
  AfterViewInit
} from '@angular/core';
import { Renderer2, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OptionComponent } from '../option/option.component';
import { SelectService } from '../select.service';
// import { OptionValueDirective } from "../option-value.directive"
import {
  filter,
  distinctUntilChanged,
  map,
  distinct,
  mergeMap,
  sample
} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'edu-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    SelectService,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SelectComponent)
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent
  implements OnInit, AfterViewInit, ControlValueAccessor {
  @Output() onValueChange = new EventEmitter<any>();
  @Input('alignment') alignment = 'center'; //left right center
  @Input('disabled') disabled = false;
  @Input('labelIsPlaceholder') labelIsPlaceholder = false;
  @Input('hideChevron') hideChevron = false;
  @Input('elementId') elementId = 'selectcomp';
  @ViewChild('checkboxEl') checkboxEl: ElementRef;
  @ContentChildren(OptionComponent) optionEls: QueryList<OptionComponent>;

  $value = new BehaviorSubject('');
  _value = '';
  set value(param) {
    // console.log('SET IN SELECT');

    if (!this.ngAfterViewInit) {
      this.selectService.setActiveValue(param);
    }

    this._value = param;
    if (param == null) {
      this.inputValue = '';
    } else {
      this.$value.next(param);
    }
    this.cd.markForCheck();
    console.log(`selectid value setter ${this.elementId} - ${param}`);
  }
  get value() {
    return this._value;
  }
  inputValue = '';
  selectIsActive; // controls the checkbox, responsible for toggling dropdown
  selectState = 'inactive'; // state [active, inactive( default ), focus, disabled ]
  activeOptionIndex = 0;
  ngafterViewHookPassed = false;
  validOptionValues = [];
  //for keyboard accessbility
  ENTER_KEY_CODE = 13;
  DOWN_ARROW_KEY_CODE = 40;
  UP_ARROW_KEY_CODE = 38;
  ESCAPE_KEY_CODE = 27;
  TAB_KEY_CODE = 9;

  @Output('edu-keydown') elkeydown = new EventEmitter();
  @Output('edu-change') elchange = new EventEmitter();

  constructor(
    private selectService: SelectService,
    private cd: ChangeDetectorRef,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.selectService.validOptionValues$.subscribe(values => {
      // console.log(this.validOptionValues);
      this.validOptionValues.push(values);
    });

    this.setElementId();
    this.$value
      .pipe
      // filter(() => this.ngafterViewHookPassed)
      // filter(param => this.isValidOption(param)),
      // distinctUntilChanged()
      ()

      .subscribe(param => {
        // this._value = param;
        this.selectService.setActiveValue(param);
      });
    //register to events here

    // this.selectService.optionClicked.subscribe(() => {
    //   this.selectState = 'focus';
    //   this.selectIsActive = false;
    //   this.checkboxEl.nativeElement.focus();
    // });
    this.selectService.activeOptionComponent
      .pipe(sample(this.selectService.optionClicked))
      .subscribe((optionComp: OptionComponent) => {
        let value = optionComp.OptionValue;
        this.onValueChange.emit(value);
        this.elchange.emit(value);
        this.onChange(value);
      });
    this.selectService.activeOptionComponent
      .pipe(
        filter(val => val != null)
        // distinctUntilChanged()
      )
      .subscribe((optionComp: OptionComponent) => {
        // if (optionComp !== null) {

        this.inputValue = optionComp.displayedValue;
        // console.log(`inputValue - ${this.inputValue}`);
        this.value = optionComp.OptionValue;

        this.cd.markForCheck();

        // } else {
        // console.log('OPTION COM IS NUL ??');
        // }

        //     this.activeOptionIndex = optionComp.indexInParent;
        //     console.log(this.value);
        //     console.log(this.inputValue);
        //     this.onValueChange.emit(this.value);
        //     this.elchange.emit(this.value);
        //     this.onChange(this.value);
        //     this.cd.markForCheck();
      });
  }
  ngAfterViewInit() {
    this.ngafterViewHookPassed = true;
  }

  isValidOption(option) {
    if (option === null) {
      return false;
    }
    // console.log(this.validOptionValues);
    return this.validOptionValues.indexOf(option) != -1;
  }

  isLabelActive() {
    return (
      this.selectIsActive ||
      (this.value !== '' &&
        this.value !== null &&
        typeof this.value !== 'undefined')
    );
  }

  @HostListener('document:click', ['$event']) clickedOutside($event) {
    this.selectIsActive = false;
  }
  @HostListener('click', ['$event']) onClick($event) {
    // if (this.selectState !== 'inactive') {
    //   $event.stopPropagation();
    // }
  }

  @HostListener('keydown', ['$event']) onKeydown($event) {
    this.keyboardEvent($event.keyCode, $event.shiftKey, $event);
  }

  setElementId() {
    let elementIdNotDefined = this.elementId === eid;
    let formcontrolnamedefined =
      this.el.nativeElement.getAttribute('formcontrolname') !== undefined;
    if (elementIdNotDefined && formcontrolnamedefined) {
      this.elementId = this.el.nativeElement.getAttribute('formcontrolname');
    }
    // let elId = this.el.nativeElement.getAttribute('formcontrolname');
    // if (this.el != undefined) {
    //   this.elementId = elId;
    // }
  }

  cbChange() {
    if (this.selectIsActive) {
      this.selectState = 'active';
    } else if (this.el.nativeElement.contains(document.activeElement)) {
      this.selectState = 'focus';
    } else {
      this.selectState = 'inactive';
      // this.selectService.resetOptionIndex();
    }

    this.cd.markForCheck();
    // console.log($event)
  }
  cbFocus() {
    this.selectState = 'focus';
  }
  cbBlur() {
    //change to rxjs operator later
    setTimeout(() => {
      if (!this.el.nativeElement.contains(document.activeElement)) {
        this.selectState = 'inactive';
        this.selectIsActive = false;
        this.onTouched();

        this.cd.markForCheck();
      }
    }, 150);
  }

  keyboardEvent(keyCode, shiftPressed, event) {
    this.elkeydown.emit(event);

    let newIndex;
    switch (keyCode) {
      case this.ENTER_KEY_CODE:
      case this.ESCAPE_KEY_CODE:
      case this.DOWN_ARROW_KEY_CODE:
      case this.UP_ARROW_KEY_CODE:
        event.preventDefault();
        break;
    }

    switch (keyCode) {
      case this.ENTER_KEY_CODE:
        if (this.selectState === 'focus') {
          this.selectIsActive = true;
          this.selectState = 'active';
        } else if (this.selectState === 'active') {
          this.selectIsActive = false;
          this.selectState = 'focus';
          // this.selectService.setActiveOption(this.optionEls.toArray()[this.activeOptionIndex].OptionValue);
          // consol
        }
        break;

      case this.ESCAPE_KEY_CODE:
        this.selectIsActive = false;
        this.selectState = 'focus';
        break;

      case this.DOWN_ARROW_KEY_CODE:
        if (this.activeOptionIndex === null) {
          newIndex = 0;
        } else {
          newIndex =
            (this.activeOptionIndex + 1 + this.optionEls.length) %
            this.optionEls.length;
        }
        // this.selectService.activeOptionIndex.next(newIndex);
        // this.selectService.setActiveOption(this.optionEls.toArray()[this.activeOptionIndex].OptionValue);
        this.selectService.activeOptionComponent.next(
          this.optionEls.toArray()[newIndex]
        );

        break;

      case this.UP_ARROW_KEY_CODE:
        if (this.activeOptionIndex === null) {
          newIndex = 0;
        } else {
          newIndex =
            (this.activeOptionIndex - 1 + this.optionEls.length) %
            this.optionEls.length;
        }
        // this.selectService.activeOptionIndex.next(newIndex);
        // this.selectService.setActiveOption(this.optionEls.toArray()[this.activeOptionIndex].OptionValue);
        this.selectService.activeOptionComponent.next(
          this.optionEls.toArray()[newIndex]
        );
        break;
    }
  }

  //Control value accessor implementation

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any) {
    this.cd.markForCheck();
    this.value = value;
    // this.selectService.setActiveOption(value);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.selectIsActive = false;
    // this.selectService.setElementIsOpenState(false);
    this.disabled = isDisabled;
    this.selectState = 'disabled';
    this.cd.markForCheck();
  }
}

const eid = 'selectId';

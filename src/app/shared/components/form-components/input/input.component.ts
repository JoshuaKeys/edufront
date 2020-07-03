import {
  Component,
  OnInit,
  AfterContentInit,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
  forwardRef,
  ViewChild,
  ElementRef,
  ContentChildren,
  QueryList,
  ChangeDetectorRef,
  Renderer2,
  HostListener,
  AfterViewInit
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputAffixDirective } from './directives/input-affix.directive';
import { ValidatorService } from '../validator/validator.service';

@Component({
  selector: 'edu-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputComponent)
    },
    ValidatorService
  ]
})
export class InputComponent
  implements OnInit, AfterContentInit, AfterViewInit, ControlValueAccessor {
  constructor(
    private cd: ChangeDetectorRef,
    private el: ElementRef,
    private validatorService: ValidatorService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    // console.log('input init');
    this.initConfig();
    this.setElementID();
    this.registerHasErrorEvent();
    this.registerValidatorPosition();
  }

  ngAfterContentInit() {
    this.subscribeToAffixDirectives();
  }
  ngAfterViewInit() {
    // console.log('input after view init ');
    // let tempStyles = JSON.parse(
    //   JSON.stringify(getComputedStyle(this.inputEl.nativeElement))
    // );
    // let tempStyles = getComputedStyle(this.inputEl.nativeElement);
    // console.log(tempStyles[58]);
    // console.log(tempStyles.fontSize);
    // console.log(Array.isArray(getComputedStyle(this.inputEl.nativeElement)));
    // let fontsize = JSON.parse(JSON.stringify(tempStyles.fontSize));
    // console.log(fontsize);

    // let fontSize = styles.fontSize;
    // let lineHeight = styles.lineHeight;
    // let fontFamily = styles.fontFamily;
    // let fontWeight = styles.letterSpacing;
    this.ngafterViewHookPassed = true;
  }
  config;
  inputElIsFocus = false;
  ngafterViewHookPassed = false;
  inputIsActive: boolean = false;
  // disabled: boolean; //for ControlValueAccessor implmentation
  tempStyles: any = 'inherit';
  fontSize = 'inherit';
  fontWeight = 'inherit';
  lineHeight = 'inherit';
  fontFamily = 'inherit';
  letterSpacing = 'inherit';
  @Input('disabled') disabled = false;
  @Input('elementId') elementId = eid;
  @Input('labelIsPlaceholder') labelIsPlaceholder = false;
  @Input('alignment') alignment = 'center'; //center (default ),left,right
  @Input('isPassword') isPassword = false;
  @ViewChild('inputEl') inputEl: ElementRef;
  @ViewChild('inputElDisplay') inputElDisplay: ElementRef;
  @Output('edu-keydown') elkeydown = new EventEmitter();
  @Output('edu-change') elchange = new EventEmitter();
  @Output('edu-blur') elBlur = new EventEmitter();
  @ContentChildren(InputAffixDirective) InputAffixDirectives: QueryList<
    InputAffixDirective
  >;
  @ViewChild('validator') validator: ElementRef;

  @HostListener('click') onclick() {
    this.inputEl.nativeElement.focus();
  }
  @HostListener('keydown', ['$event']) EventKeydown(event) {
    // console.log(event);
    this.elkeydown.emit(event);

    // console.log(getComputedStyle(this.inputEl.nativeElement));
  }
  setElementID() {
    let elementIdDefined = this.elementId !== eid;
    let formcontrolnamedefined =
      this.el.nativeElement.getAttribute('formcontrolname') !== undefined;
    if (!elementIdDefined && formcontrolnamedefined) {
      this.elementId = this.el.nativeElement.getAttribute('formcontrolname');
    }
  }

  subscribeToAffixDirectives() {
    this.InputAffixDirectives.forEach((dir, index) => {
      dir.setConfig.subscribe(val => {
        this.config[val.key] = val.value;
        this.cd.markForCheck();
      });
    });

    this.cd.markForCheck();
  }

  registerHasErrorEvent() {
    this.validatorService.validatorHasError.subscribe(
      hasError => (this.config.hasError = hasError)
    );
  }

  registerValidatorPosition() {
    let possiblePositions = ['left', 'right', 'bottom', 'bottom-flow'];
    this.validatorService.validatorPosition.subscribe(position => {
      if (
        possiblePositions.indexOf(position) != -1 &&
        this.validator &&
        !this.validator.nativeElement.classList.contains(position)
      ) {
        this.validator.nativeElement.classList.add(position);
        // console.log(this.validator.nativeElement.classList);
      }
    });
  }

  initConfig() {
    this.config = {
      isPassword: this.isPassword,
      hasError: false,
      prefixValue: '' //might have to delete this later, was meant to prefix existing value in input
    };
  }
  focusInput() {
    this.inputElIsFocus = true;
  }
  blurInput() {
    // console.log('BLUR INPUT');
    this.elBlur.emit(this.value);

    this.inputElIsFocus = false;
    this.onTouched();
    // this.onChange(this.val);
  }
  inputFn(val) {
    this.value = val;

    // this.onChange(val);
  }

  isLabelActive() {
    return this.inputElIsFocus || this.val != '';
  }

  // value = ""; //for ControlValueAccessor implmentation
  val = '';
  // valLen;
  get value() {
    return this.val;
  }
  set value(val) {
    // console.log(`input setValue --` + val);
    if (val === null) {
      this.val = '';
    } else {
      this.val = val;
    }

    if (this.ngafterViewHookPassed) {
      // console.log('AFTER VIEW INIT');
      this.elchange.emit(val);
      this.onChange(val);
      // this.cd.markForCheck();
    }
    this.cd.markForCheck();
    // this.onTouched(val)
  }
  //Control value accessor implementation

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any) {
    // console.log('input write value ');
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

const eid = 'inputComponent';

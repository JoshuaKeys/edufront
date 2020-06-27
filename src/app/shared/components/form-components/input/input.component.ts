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
    this.initConfig();
    this.setElementID();
    this.registerHasErrorEvent();
    this.registerValidatorPosition();
  }

  ngAfterContentInit() {
    this.subscribeToAffixDirectives();
  }
  ngAfterViewInit() {
    this.fontSize = getComputedStyle(this.inputEl.nativeElement).fontSize;
    this.lineHeight = getComputedStyle(this.inputEl.nativeElement).lineHeight;
    this.fontFamily = getComputedStyle(this.inputEl.nativeElement).fontFamily;
    this.fontWeight = getComputedStyle(this.inputEl.nativeElement).fontWeight;
    this.letterSpacing = getComputedStyle(
      this.inputEl.nativeElement
    ).letterSpacing;
  }
  config;
  inputElIsFocus = false;

  inputIsActive: boolean = false;
  // disabled: boolean; //for ControlValueAccessor implmentation
  fontSize;
  fontWeight;
  lineHeight;
  fontFamily;
  letterSpacing;
  @Input('disabled') disabled = false;
  @Input('elementId') elementId;
  @Input('labelIsPlaceholder') labelIsPlaceholder = false;
  @Input('alignment') alignment = 'center'; //center (default ),left,right
  @Input('isPassword') isPassword = false;
  @ViewChild('inputEl') inputEl: ElementRef;
  @Output('edu-keydown') elkeydown = new EventEmitter();
  @Output('edu-change') elchange = new EventEmitter();
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
    if (
      this.elementId == undefined &&
      this.el.nativeElement.getAttribute('formcontrolname') !== undefined
    ) {
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
        console.log(this.validator.nativeElement.classList);
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
    this.inputElIsFocus = false;
    this.onTouched();
    this.onChange(this.val);
  }
  inputFn(val) {
    this.value = val;

    this.onChange(val);
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
    // console.log(`setValue --` + val);
    // this value is updated by programmatic changes if( val !== undefined && this.val !== val){
    if (val === null) {
      // console.log('is null');
      val = '';
    }
    this.val = val;
    // this.valLen = this.val.length;
    this.elchange.emit(val);
    this.onChange(val);
    this.cd.markForCheck();
    // this.onTouched(val)
  }
  //Control value accessor implementation

  onChange: any = () => {};
  onTouched: any = () => {};

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

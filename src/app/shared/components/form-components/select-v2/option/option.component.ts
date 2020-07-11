import {
  Component,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  Input,
  HostListener,
  AfterViewInit,
  OnInit,
  ViewChild,
  EventEmitter,
  Output
} from '@angular/core';
import { SelectService } from '../select.service';
import { filter } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'edu-option-v2',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionComponent2 implements OnInit, AfterViewInit {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private selectService: SelectService,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit() {
    // this.indexInParent = Array.from(
    //   this.el.nativeElement.parentElement.children
    // ).indexOf(this.el.nativeElement);

    // this.selectService.activeOptionIndex.subscribe((activeIndex)=>{
    //   if(this.indexInParent === activeIndex){
    //     this.isActive = true;
    //     this.renderer.addClass(this.el.nativeElement, "selected");
    //   }else{
    //     this.isActive = false;
    //     this.renderer.removeClass(this.el.nativeElement, "selected");
    //   }
    //   this.cd.markForCheck();
    // })
    // this.selectService.activeOptionComponent.subscribe(activeComp => {
    //   if (this === activeComp) {
    //     this.isActive = true;
    //     this.renderer.addClass(this.el.nativeElement, 'selected');
    //     this.cd.markForCheck();
    //   } else {
    //     this.isActive = false;
    //     this.renderer.removeClass(this.el.nativeElement, 'selected');
    //     this.cd.markForCheck();
    //   }
    // });

    // this.selectService.optionClicked.subscribe(() => {
    //   this.renderer.removeClass(this.el.nativeElement, 'selected');
    // });
    console.log(`option init`, this.OptionValue);
    this.selectService.validOptionValues$.next(this.OptionValue);
  }
  ngAfterViewInit() {
    let displayedValue = this.optionEl.nativeElement.childNodes[0];
    displayedValue =
      this.optionEl.nativeElement.childNodes[0] === undefined
        ? ''
        : displayedValue.nodeValue;
    this.displayedValue = displayedValue;

    this.selectService.activeValue
      .pipe(distinctUntilChanged())
      .subscribe(value => {
        if (typeof value == 'string') {
          if (
            value.toLocaleLowerCase() == `${this.OptionValue}`.toLowerCase()
          ) {
            this.isActive = true;
          } else {
            this.isActive = false;
          }
        } else if (typeof value == 'number') {
          if (value == parseInt(this.OptionValue)) {
            this.isActive = true;
          } else {
            this.isActive = false;
          }
        } else {
          if (JSON.stringify(value) == JSON.stringify(this.OptionValue)) {
            this.isActive = true;
          } else {
            this.isActive = false;
          }
        }
        if (this.isActive) {
          // console.log('setting active option @ ' + this.OptionValue);
          this.selectService.setActiveOption(this);
        }
        this.cd.markForCheck();
        // console.log(`[${this.OptionValue}] - ${this.isActive}`);
      });
    // console.log(JSON.stringify(this.selectService.activeOption));
    // console.log(
    //   `selet vs opt - ${this.selectService.activeValue} ${this.OptionValue}`
    // );
    // console.log(this.selectService.activeValue);
  }

  @Input('OptionValue') OptionValue;
  @Output('edu-selected') onEduSelected = new EventEmitter();
  @ViewChild('optionEl') optionEl: ElementRef;
  displayedValue;
  isActive = false;
  indexInParent;

  @HostListener('click') onClick() {
    // this.selectService.setActiveOption(this.OptionValue);
    // console.log('CLICK ED ' + this.displayedValue);
    this.optionSelected();
  }

  optionSelected() {
    console.log(`option clicked - ${this.OptionValue}`);
    this.onEduSelected.emit(this.OptionValue);

    this.selectService.activeOptionComponent.next(this);
    this.selectService.optionClicked.next(this);
  }

  resetState() {
    this.isActive = false;
  }
  setActive() {
    this.isActive = true;
  }

  // @HostListener("valueChange",["$event"]) onValueChange($event){ //listenting to  directive
  //   this.selectService.setActiveOption($event);
  // }
  // @HostListener("initValue",["$event"]) onInitValue($event){ //listenting to  directive
  //   this.value = $event;
  // }
}

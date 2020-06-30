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
  ViewChild
} from '@angular/core';
import { SelectService } from '../_shared/select.service';
@Component({
  selector: 'edu-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionComponent implements OnInit, AfterViewInit {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private selectService: SelectService,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.indexInParent = Array.from(
      this.el.nativeElement.parentElement.children
    ).indexOf(this.el.nativeElement);

    if (this.isActive) {
      this.selectService.activeOptionIndex.next(this.indexInParent);
    }

    this.selectService.activeOptionComponent.subscribe(activeComp => {
      if (this === activeComp) {
        this.isActive = true;
        this.renderer.addClass(this.el.nativeElement, 'selected');
        this.cd.markForCheck();
      } else {
        this.isActive = false;
        this.renderer.removeClass(this.el.nativeElement, 'selected');
        this.cd.markForCheck();
      }
    });

    this.selectService.optionClicked.subscribe(() => {
      this.renderer.removeClass(this.el.nativeElement, 'selected');
    });
  }
  ngAfterViewInit() {
    let displayedValue = this.optionEl.nativeElement.childNodes[0];
    displayedValue =
      this.optionEl.nativeElement.childNodes[0] === undefined
        ? ''
        : displayedValue.nodeValue;
    this.displayedValue = displayedValue;
    console.log(this.displayedValue);
    console.log(JSON.stringify(this.selectService.activeValue));

    if (this.selectService.activeValue == this.OptionValue) {
      this.selectService.activeOptionComponent.next(this);
    }
  }

  @Input('OptionValue') OptionValue;
  @ViewChild('optionEl') optionEl: ElementRef;
  displayedValue;
  isActive = false;
  indexInParent;

  @HostListener('click') onClick() {
    // this.selectService.setActiveOption(this.OptionValue);
    // console.log('CLICK ED ' + this.displayedValue);
    this.selectService.optionClicked.next();
    this.selectService.activeOptionComponent.next(this);
  }
}

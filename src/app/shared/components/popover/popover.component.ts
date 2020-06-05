import {
  Component,
  OnInit,
  AfterContentInit,
  ChangeDetectionStrategy,
  HostListener,
  ChangeDetectorRef,
  Input,
  Renderer2,
  ElementRef,
  ContentChildren,
  QueryList,
  ViewChildren
} from '@angular/core';
import { PopoverOptionDirective } from './popover-option.directive';
@Component({
  selector: 'edu-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopoverComponent implements OnInit, AfterContentInit {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // this.cd.markForCheck();

    this.renderer.addClass(
      this.el.nativeElement,
      `pointer-${this.pointerAlignment}`
    );
    this.renderer.addClass(this.el.nativeElement, this.alignment);

    this.renderer.listen(
      this.el.nativeElement.parentElement,
      'click',
      $event => {
        this.togglePopoverState();
        this.cd.markForCheck();
      }
    );
  }

  ngAfterContentInit() {
    this.popoverOptionDir.forEach(dir => {
      dir.closePopoverEvent.subscribe(close => {
        this.renderer.removeClass(this.el.nativeElement, 'active');
        // this.cd.markForCheck();
      });
    });
  }
  @ContentChildren(PopoverOptionDirective) popoverOptionDir: QueryList<
    PopoverOptionDirective
  >;
  //possible values [top, left, right, bottom]
  @Input('alignment') alignment = 'bottom';
  //possible values [left, center, right] and it only works for top and bottom
  @Input('pointerAlignment') pointerAlignment = 'center';

  @HostListener('document:click', ['$event']) clickedOutside($event) {
    //close element when click is from outside
    if (!this.el.nativeElement.parentElement.contains($event.srcElement)) {
      this.renderer.removeClass(this.el.nativeElement, 'active');
    }
  }
  @HostListener('click', ['$event']) onClick($event) {
    //stops propagation on lower layers
    // $event.preventDefault();
    console.log(this.popoverOptionDir);
    $event.stopPropagation();
  }

  @HostListener('close', ['$event']) onClose($event) {
    //stops propagation on lower layers
    // $event.preventDefault();
    // $event.stopPropagation();
    console.log('CLOSE POPOVER');
  }

  popoverIsOpened: boolean = false;

  togglePopoverState() {
    let hasActiveClass = this.el.nativeElement.classList.contains('active');
    if (hasActiveClass) {
      this.renderer.removeClass(this.el.nativeElement, 'active');
    } else {
      this.renderer.addClass(this.el.nativeElement, 'active');
    }
    // this.popoverIsOpened = !this.popoverIsOpened;
  }
}

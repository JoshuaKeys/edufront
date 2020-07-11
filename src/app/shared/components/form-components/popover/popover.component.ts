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
  Output,
  EventEmitter,
  AfterViewInit
} from '@angular/core';
import { PopoverOptionDirective } from './popover-option.directive';
@Component({
  selector: 'edu-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopoverComponent
  implements OnInit, AfterContentInit, AfterViewInit {
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
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.renderer.listen(
        this.el.nativeElement.parentElement,
        'click',
        $event => {
          this.togglePopoverState();
          this.cd.markForCheck();
        }
      );
    });
  }

  ngAfterContentInit() {
    this.popoverOptionDir.forEach(dir => {
      // console.log('subscribe');
      dir.closePopoverEvent.subscribe(close => {
        this.togglePopoverState();
        // this.renderer.removeClass(this.el.nativeElement, 'active');
        // console.log('close?');
        this.cd.markForCheck();
      });
    });
  }
  @Output('close') onClose = new EventEmitter();
  @Output('edu-open') openEvent = new EventEmitter();
  @Output('edu-close') closeEvent = new EventEmitter();
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
      // this.togglePopoverState();
      if (this.el.nativeElement.classList.contains('active')) {
        this.togglePopoverState();
        // this.renderer.removeClass(this.el.nativeElement, 'active');
        this.onClose.emit();
      }
    }
  }
  @HostListener('click', ['$event']) onClick($event) {
    //stops propagation on lower layers
    // $event.preventDefault();
    // console.log(this.popoverOptionDir);
    if (this.el.nativeElement.classList.contains('active')) {
      $event.stopPropagation();
    }
  }

  togglePopoverState() {
    let hasActiveClass = this.el.nativeElement.classList.contains('active');
    if (hasActiveClass) {
      this.renderer.removeClass(this.el.nativeElement, 'active');
      // console.log('inactive');
      this.onClose.emit();
      this.closeEvent.emit();
    } else {
      this.renderer.addClass(this.el.nativeElement, 'active');
      // console.log('active');
      this.openEvent.emit();
    }
  }
}

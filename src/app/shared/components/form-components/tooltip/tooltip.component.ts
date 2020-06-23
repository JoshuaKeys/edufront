import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Renderer2,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'edu-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipComponent implements OnInit {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.renderer.addClass(
      this.el.nativeElement,
      `pointer-${this.pointerAlignment}`
    );
    this.renderer.addClass(this.el.nativeElement, this.alignment);
  }
  ngAfterViewInit() {
    // this.renderer.addClass(this.el.nativeElement, 'active');

    this.renderer.listen(
      this.el.nativeElement.parentElement,
      'mouseover',
      $event => {
        console.log('enter');
        this.renderer.addClass(this.el.nativeElement, 'active');
      }
    );
    this.renderer.listen(
      this.el.nativeElement.parentElement,
      'mouseleave',
      $event => {
        console.log('leave');
        this.renderer.removeClass(this.el.nativeElement, 'active');
      }
    );
  }

  //possible values [top, left, right, bottom]
  @Input('alignment') alignment = 'top';
  //possible values [left, center, right] and it only works for top and bottom
  @Input('pointerAlignment') pointerAlignment = 'center';

  togglePopoverState() {
    let hasActiveClass = this.el.nativeElement.classList.contains('active');
    if (hasActiveClass) {
      this.renderer.removeClass(this.el.nativeElement, 'active');
    } else {
      this.renderer.addClass(this.el.nativeElement, 'active');
    }
    console.log(this.el.nativeElement.classList);
  }
}

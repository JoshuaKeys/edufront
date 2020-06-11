import {
  Directive,
  Input,
  OnInit,
  HostListener,
  Renderer2,
  ElementRef
} from '@angular/core';

@Directive({
  selector: '[PreviewAnimate]'
})
export class PreviewAnimateDirective implements OnInit {
  constructor(private render: Renderer2, private el: ElementRef) {}
  ngOnInit() {}

  @Input('PreviewAnimate') PreviewAnimate: string;

  @HostListener('mousedown') onMouseDown() {
    if (!this.el.nativeElement.classList.contains('click')) {
      this.render.addClass(this.el.nativeElement, 'click');
    }
  }
  @HostListener('mouseup') onMouseUp() {
    if (this.el.nativeElement.classList.contains('click')) {
      this.render.removeClass(this.el.nativeElement, 'click');
    }
  }
  @HostListener('mouseout') onMouseOut() {
    if (this.el.nativeElement.classList.contains('click')) {
      this.render.removeClass(this.el.nativeElement, 'click');
    }
  }
  @HostListener('mouseenter') onMouseEnter() {}
}

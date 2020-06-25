import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[sliderChildren]'
})
export class SliderChildrenDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'position', 'absolute');
    this.renderer.setStyle(this.el.nativeElement, 'z-index', '2');
    this.renderer.setStyle(this.el.nativeElement, 'top', '50%');
    this.renderer.setStyle(this.el.nativeElement, 'left', '50%');
    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      'translate(-50%,-50%)'
    );
    this.renderer.setStyle(this.el.nativeElement, 'font-size', '42px');
    this.renderer.setStyle(this.el.nativeElement, 'font-weight', '700');
  }
}

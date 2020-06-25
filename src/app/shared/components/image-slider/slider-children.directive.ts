import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit
} from '@angular/core';
import { ImageSliderService } from './image-slider.service';
@Directive({
  selector: '[sliderChildren]'
})
export class SliderChildrenDirective implements OnInit, AfterViewInit {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private sliderService: ImageSliderService
  ) {
    this.renderer.setStyle(this.el.nativeElement, 'position', 'absolute');
    this.renderer.setStyle(this.el.nativeElement, 'z-index', '2');
    // this.renderer.setStyle(this.el.nativeElement, 'top', '50%');
    // this.renderer.setStyle(this.el.nativeElement, 'left', '50%');
    // this.renderer.setStyle(
    //   this.el.nativeElement,
    //   'transform',
    //   'translate(-50%,-50%)'
    // );
    // this.renderer.setStyle(this.el.nativeElement, 'font-size', '42px');
    // this.renderer.setStyle(this.el.nativeElement, 'font-weight', '700');
  }

  ngOnInit() {
    this.sliderService.newPlaceholderImg.next();
    // this.onInit.emit();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.sliderService.newSlider.next(this.el);
    });
  }

  @Output() onInit = new EventEmitter();
}

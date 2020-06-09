import { Directive, ElementRef, Renderer2, OnDestroy, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appDroppable]'
})
export class DroppableDirective implements OnInit {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }
  ngOnInit() {
    this.renderer.setProperty(this.elementRef.nativeElement, 'draggable', true);
    this.renderer.addClass(this.elementRef.nativeElement, 'app-draggable');
  }
}

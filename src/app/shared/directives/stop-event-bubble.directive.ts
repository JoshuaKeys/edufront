import { Directive, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[stopEventBubble]'
})
export class StopEventBubbleDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  ngOnInit() {
    this.renderer.listen(this.el.nativeElement, this.stopEventBubble, event => {
      event.stopPropagation();
    });
  }

  @Input('stopEventBubble') stopEventBubble: string;
}

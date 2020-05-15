import { Directive, ElementRef, Renderer2, OnDestroy, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective implements OnInit, OnDestroy {

  private onDragStart: Function;

  private options: DraggableOptions;

  @Input()
  set appDraggable(options: DraggableOptions) {
    if (options) {
      this.options = options;
    }
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.setProperty(this.elementRef.nativeElement, 'draggable', true);
    this.renderer.addClass(this.elementRef.nativeElement, 'app-draggable');
  }
  ngOnInit() {
    this.addDragEvents();
  }
  ngOnDestroy() {
    this.onDragStart();
  }
  private addDragEvents(): void {
    this.onDragStart = this.renderer.listen(
      this.elementRef.nativeElement
      , 'dragstart'
      , (event: DragEvent): void => {
        event.dataTransfer
          .setData('Text'
            , JSON.stringify(this.options.data));
      });
  }


}

export interface DraggableOptions {
  data?: any;
}

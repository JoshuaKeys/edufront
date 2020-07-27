import { Directive, ElementRef, Renderer2, OnDestroy, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective implements OnInit, OnDestroy {

  private onDragStart: Function;

  private options: DraggableOptions;

  @Input()
  set appDraggable(options: DraggableOptions) {
    // alert('hello')
    if (options) {
      this.options = options;
      // this.addDragEvents();
    }
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {

  }
  ngOnInit() {
    this.addDragEvents();
    if (!this.options.notDraggable) {
      this.renderer.setProperty(this.elementRef.nativeElement, 'draggable', true);
    }
    this.renderer.addClass(this.elementRef.nativeElement, 'app-draggable');
  }
  ngOnDestroy() {
    this.onDragStart();
  }
  private addDragEvents(): void {
    console.log(this.options);
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
  notDraggable?: boolean;
}

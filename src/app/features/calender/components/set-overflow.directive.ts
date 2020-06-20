import {
  Directive,
  Input,
  OnInit,
  ElementRef,
  AfterViewInit
} from '@angular/core';

@Directive({
  selector: '[setOVerflow]'
})
export class SetOVerflowDirective implements OnInit, AfterViewInit {
  constructor(private el: ElementRef) {}
  @Input('maximum') maximum: string;

  vh;
  scrollableHeight;
  ngOnInit() {}

  ngAfterViewInit() {
    this.updateScrollable();
    console.log(
      `maximum ${this.maximum} vh ${this.vh} scrollableHeight ${this.scrollableHeight}`
    );
  }

  updateScrollable() {
    this.vh = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    this.scrollableHeight = this.el.nativeElement.offsetHeight;
  }
}

import {
  Directive,
  HostListener,
  Output,
  EventEmitter,
  Input
} from '@angular/core';

@Directive({
  selector: '[ClosePopover]'
})
export class PopoverOptionDirective {
  constructor() {}

  _ClosePopover: boolean;
  get ClosePopover() {
    return this._ClosePopover;
  }
  @Input('ClosePopover') set ClosePopover(param) {
    this._ClosePopover = param;
    // console.log('should close stuff');
    this.closePopoverEvent.emit();
  }

  @Output('closePopover') closePopoverEvent = new EventEmitter();
}

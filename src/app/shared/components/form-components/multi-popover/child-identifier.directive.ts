import {
  Directive,
  OnInit,
  AfterViewInit,
  Input,
  OnDestroy
} from '@angular/core';
import { MultiPopoverService } from './multi-popover.service';

@Directive({
  selector: '[childIdentifier]'
})
export class ChildIdentifierDirective
  implements OnInit, AfterViewInit, OnDestroy {
  constructor(private service: MultiPopoverService) {}

  @Input('childIdentifier') childIdentifier;
  sub;
  componentIds;
  ngOnInit() {
    console.log('component created at on init', this.childIdentifier);
    this.service.componentIdArr$.subscribe(ids => {
      this.componentIds = [...ids];
    });
  }
  ngAfterViewInit() {
    console.log('component created at after view init', this.childIdentifier);
    this.service.newMultiPopoverId$.next(this.childIdentifier);
    this.service.componentIdArr$.next([
      ...this.componentIds,
      this.childIdentifier
    ]);
  }

  ngOnDestroy() {}
}

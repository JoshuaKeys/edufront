import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ContentChild,
  TemplateRef,
  OnDestroy
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'edu-console-calendar-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsoleSearchComponent implements OnInit, OnDestroy {
  subsink = new Subscription();
  @ContentChild('buttonTemplate', { static: true }) buttonTemplate: TemplateRef<
    any
  >;
  @Input() searchPlaceholder = 'Search';
  @Input() items: any[];
  @Output() itemClicked = new EventEmitter();
  @Output() search: EventEmitter<string> = new EventEmitter();
  @Output() create: EventEmitter<null> = new EventEmitter();
  ctrl = new FormControl();
  constructor() {
    this.subsink.add(
      this.ctrl.valueChanges.subscribe(v => {
        this.search.emit(v.toLowerCase());
      })
    );
  }

  ngOnDestroy() {
    this.subsink.unsubscribe();
  }

  ngOnInit(): void {}

  onCreate() {
    this.create.emit();
  }
}

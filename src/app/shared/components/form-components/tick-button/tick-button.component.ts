import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ElementRef,
  Renderer2
} from '@angular/core';

@Component({
  selector: 'edu-tick-button',
  templateUrl: './tick-button.component.html',
  styleUrls: ['./tick-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TickButtonComponent implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(this.el.nativeElement, this.alignment);
  }

  @Input() alignment = 'bottomright';

  ngOnInit(): void {
    // console.log('tick' + this.alignment);
  }
}

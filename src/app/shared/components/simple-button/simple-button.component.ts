import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  HostListener,
  Renderer2,
  ElementRef,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'edu-simple-button',
  templateUrl: './simple-button.component.html',
  styleUrls: ['./simple-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleButtonComponent implements OnInit {
  @Input() disabled = false;
  // Used to set border, text or background color
  @Input() color: string = '#69a9f2';
  @Input() type: 'stroked' | 'flat' | 'basic' = 'basic';

  @ViewChild('button') button: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  @HostListener('mouseenter') hover() {
    if (this.type === 'stroked') {
      this.renderer.setStyle(
        this.button.nativeElement,
        'background-color',
        this.color
      );
      this.renderer.setStyle(this.button.nativeElement, 'color', 'white');
      this.renderer.addClass(this.button.nativeElement, 'hover');
    }
  }

  @HostListener('mouseleave') blur() {
    if (this.type === 'stroked') {
      this.renderer.removeStyle(this.button.nativeElement, 'background-color');
      this.renderer.setStyle(this.button.nativeElement, 'color', this.color);
      this.renderer.removeClass(this.button.nativeElement, 'hover');
    }
  }
}

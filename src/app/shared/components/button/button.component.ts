import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Renderer2,
  ElementRef
} from '@angular/core';

@Component({
  selector: '[ButtonType]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    // console.log("button1" + this.ButtonType)
  }

  ngOnInit(): void {
    this.renderer.addClass(this.el.nativeElement, this.ButtonType);
    // this.el.nativeElement.classList.add()
  }

  //[text , outline , icon,  basic, roundbasic, round , blank, fab/icon-circle ]
  @Input() ButtonType = 'basic';
}

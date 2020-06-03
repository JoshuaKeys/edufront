import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'edu-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.setElementID();
    this.setSizeStyle();
  }

  setElementID() {
    if (
      this.elementId == undefined &&
      this.el.nativeElement.getAttribute('formcontrolname') !== undefined
    ) {
      this.elementId = this.el.nativeElement.getAttribute('formcontrolname');
    }
  }

  @Input('size') size = '';
  @Input('cbStyle') cbStyle = {};
  @Input('elementId') elementId;
  @Input('alignment') alignment = 'right'; //top,bottom, left,right(default )
  isChecked = false;
  sizeStyle = {};

  setSizeStyle() {
    if (this.size != '') {
      let dimension = {
        width: this.size,
        height: this.size
      };
      this.sizeStyle = { ...this.sizeStyle, ...dimension };
      // console.log(this.sizeStyle);
    }
    this.sizeStyle = { ...this.sizeStyle, ...this.cbStyle };
  }
}

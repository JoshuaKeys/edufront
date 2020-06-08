import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ElementRef,
  Renderer2
} from '@angular/core';

@Component({
  selector: 'edu-modal-v2',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponentV2 implements OnInit {
  @Input() icon: string;
  @Input() header: string;
  @Input() description: string;
  @Input() btnText: string;
  @Input() completeModal: boolean;
  @Input() leftBtn: string;
  @Input() rightBtn: string;
  @Input() modalType: string; //[intro,complete,form]

  @Output() btnClicked = new EventEmitter();
  @Output() leftBtnClicked = new EventEmitter();
  @Output() rightBtnClicked = new EventEmitter();

  onBtnClick() {
    this.btnClicked.emit();
  }
  onModalClick($event) {
    $event.stopPropagation();
  }
  onLeftBtnClicked() {
    this.leftBtnClicked.emit();
  }
  onRightBtnClicked() {
    this.rightBtnClicked.emit();
  }
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  ngOnInit() {
    console.log('?? startg');
    this.validateInputFields();
    if (this.modalType === 'intro') {
      this.renderer.addClass(this.el.nativeElement, 'intro');
      console.log('?? intro');
    }
  }
  validateInputFields() {
    if (this.completeModal && !this.validateCompleteModalBtns()) {
      const errMsg = `
        Invalid usage of ModalComponent:
        When you set completeModal to true, you must provide both
        leftBtn and rightBtn properties.
      `;
      throw Error(errMsg.trim());
    }
  }
  validateCompleteModalBtns() {
    return this.leftBtn && this.rightBtn;
  }
}

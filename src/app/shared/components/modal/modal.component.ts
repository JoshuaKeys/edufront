import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";

@Component({
  selector: 'edu-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() icon: string;
  @Input() header: string;
  @Input() description: string;
  @Input() btnText: string;
  @Input() completeModal: boolean;
  @Input() leftBtn: string;
  @Input() rightBtn: string

  @Output() btnClicked = new EventEmitter();
  @Output() leftBtnClicked = new EventEmitter();
  @Output() rightBtnClicked = new EventEmitter();


  onBtnClick() {
    this.btnClicked.emit();
  }
  onLeftBtnClicked() {
    this.leftBtnClicked.emit();
  }
  onRightBtnClicked() {
    this.rightBtnClicked.emit();
  }

  ngOnInit() {
    this.validateInputFields()
  }
  validateInputFields() {
    if (this.completeModal && !this.validateCompleteModalBtns()) {
      const errMsg = `
        Invalid usage of ModalComponent:
        When you set completeModal to true, you must provide both
        leftBtn and rightBtn properties.
      `
      throw Error(errMsg.trim())
    }
  }
  validateCompleteModalBtns() {
    return this.leftBtn && this.rightBtn;
  }
}

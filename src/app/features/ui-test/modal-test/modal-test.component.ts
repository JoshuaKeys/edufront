import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ModalService } from '../modal/modal.service';

import { TestingComponentComponent } from './testing-component/testing-component.component';

@Component({
  selector: 'edu-modal-test',
  templateUrl: './modal-test.component.html',
  styleUrls: ['./modal-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalTestComponent implements OnInit {
  constructor(private modalService: ModalService) {}

  ngOnInit(): void {}
  openModal() {
    let params = {
      title: 'this is a injected el title',

      desc: 'this is another desc',
      random123: 'blah blaj'
    };
    this.modalService.addModal(TestingComponentComponent, params);
  }
  closeModal() {
    this.modalService.clearModal();
  }
}

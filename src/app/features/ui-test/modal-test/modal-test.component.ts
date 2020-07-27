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
      random123: 'blah blah'
    };

    let outputs = ['testEvent', 'testEvent2'];
    this.modalService
      .addModal(TestingComponentComponent, params, outputs)
      .subscribe(value => {
        console.log('subbing to modalService', value);
      });
  }
  closeModal() {
    this.modalService.clearModal();
  }
}

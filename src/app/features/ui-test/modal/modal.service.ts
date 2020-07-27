import { Injectable, Renderer2, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  activeComponentInModal = new Subject();
  activeComponentEventStream = new Subject();
  constructor() {
    console.log('created service');
  }

  resetActiveComponentEventStream() {
    this.activeComponentEventStream = new Subject();
  }

  addModal(componentToBePassedToModal = null, param = {}, output = []) {
    console.log('adding modal');
    this.activeComponentInModal.next({
      component: componentToBePassedToModal,
      param
    });
    return this.activeComponentEventStream;
    //return results boolean if modalExist
  }

  closeModal() {
    this.activeComponentInModal.next({
      component: null,
      param: {},
      output: []
    });
  }
  clearModal() {
    this.activeComponentInModal.next({
      component: null,
      param: {},
      output: []
    });
  }
}

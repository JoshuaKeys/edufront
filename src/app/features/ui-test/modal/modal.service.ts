import { Injectable, Renderer2, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  activeComponentInModal = new Subject();
  constructor() {
    console.log('created service');
  }

  addModal(componentToBePassedToModal = null, param = {}) {
    console.log('adding modal');
    this.activeComponentInModal.next({
      component: componentToBePassedToModal,
      param
    });

    //return results boolean if modalExist
  }

  closeModal() {
    this.activeComponentInModal.next({ component: null, param: {} });
  }
  clearModal() {
    this.activeComponentInModal.next({ component: null, param: {} });
  }
}

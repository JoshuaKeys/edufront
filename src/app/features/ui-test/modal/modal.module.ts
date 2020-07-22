import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalService } from './modal.service';
import { ModalContainerComponent } from './modal-container/modal-container.component';
@NgModule({
  declarations: [ModalContainerComponent],
  imports: [CommonModule],
  providers: [ModalService],
  exports: [ModalContainerComponent]
})
export class ModalModule {}

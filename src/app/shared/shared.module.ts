import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { ModalComponent } from './components/modal/modal.component';



@NgModule({
  declarations: [
    ModalComponent,
    HeaderNavComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalComponent,
    HeaderNavComponent
  ]
})
export class SharedModule { }

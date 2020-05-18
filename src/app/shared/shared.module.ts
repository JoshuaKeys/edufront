import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { CustomSelectComponent } from './components/custom-select/custom-select.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';



@NgModule({
  declarations: [
    ModalComponent,
    CustomSelectComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalComponent,
    CustomSelectComponent
  ],

})
export class SharedModule { }

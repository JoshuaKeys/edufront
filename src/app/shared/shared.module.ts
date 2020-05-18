import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { ModalComponent } from './components/modal/modal.component';
import { CustomSelectComponent } from './components/custom-select/custom-select.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';



@NgModule({
  declarations: [
    ModalComponent,
<<<<<<< HEAD
    CustomSelectComponent
=======
    HeaderNavComponent
>>>>>>> c5a0643302043861ff177b6b5c1a6fe07fd75ebb
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalComponent,
<<<<<<< HEAD
    CustomSelectComponent
  ],

=======
    HeaderNavComponent
  ]
>>>>>>> c5a0643302043861ff177b6b5c1a6fe07fd75ebb
})
export class SharedModule { }

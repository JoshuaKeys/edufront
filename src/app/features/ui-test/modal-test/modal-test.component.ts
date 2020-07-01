import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  Renderer2
} from '@angular/core';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'edu-modal-test',
  templateUrl: './modal-test.component.html',
  styleUrls: ['./modal-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalTestComponent implements OnInit {
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}
  modalIsActive = false;
  addActiveClass() {
    this.modalIsActive = true;
    // console.log(this.modalTest.nativeElement);
    // this.renderer.addClass(this.modalTest.nativeElement, 'active');
  }
}

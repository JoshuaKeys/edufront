import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  Renderer2,
  AfterViewInit
} from '@angular/core';

@Component({
  selector: 'edu-admin-modal',
  templateUrl: './admin-modal.component.html',
  styleUrls: ['./admin-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminModalComponent implements OnInit, AfterViewInit {
  constructor(private renderer: Renderer2) {}
  @Output('closeModal') closeModal = new EventEmitter();
  @ViewChild('modal') modal: ElementRef;
  ngOnInit(): void {}
  ngAfterViewInit() {
    this.renderer.listen(this.modal.nativeElement, 'click', $event => {
      $event.stopPropagation();
      $event.preventDefault();
    });
  }
  //0,1,2,3,4
  activeScreenIndex = 1;
  isActiveScreen(index) {
    return this.activeScreenIndex === index;
  }

  onCloseModal() {
    this.closeModal.emit();
  }
}

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
  //0 Transfer School Ownership user authenthication,
  //1 Nominate the next School Master Administrator,
  //2 add new user,
  //3  verfication of new user added,
  //4 completion page
  activeScreenIndex = 0;
  isActiveScreen(index) {
    return this.activeScreenIndex === index;
  }

  setActiveScreen(index) {
    this.activeScreenIndex = index;
  }

  onCloseModal() {
    this.closeModal.emit();
  }
}

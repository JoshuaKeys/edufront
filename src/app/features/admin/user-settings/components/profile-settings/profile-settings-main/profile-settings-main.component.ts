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
  selector: 'edu-profile-settings-main',
  templateUrl: './profile-settings-main.component.html',
  styleUrls: ['./profile-settings-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileSettingsMainComponent implements OnInit, AfterViewInit {
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.blockModalClick();
  }

  menuOptions = ['Profile', 'Security', 'Email Preferences'];
  activeMenu = this.menuOptions[0];
  @Output('close') closeModalEvent = new EventEmitter();
  @ViewChild('modal') modal: ElementRef;
  setActiveMenu(option) {
    this.activeMenu = option;
  }
  isActiveMenu(option) {
    return this.activeMenu == option;
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  blockModalClick() {
    console.log(this.modal);
    this.renderer.listen(this.modal.nativeElement, 'click', $event => {
      //  $event.preventDefault();
      console.log('MODAL CLICK');
      $event.stopPropagation();
    });
  }
}

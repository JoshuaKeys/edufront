import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';

@Component({
  selector: 'edu-administrators-tab',
  templateUrl: './administrators-tab.component.html',
  styleUrls: ['./administrators-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdministratorsTabComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  showAddAdmin = false;
  showModal = true;
  popoverToggleBoolean = false;
  @Input() owners = [
    { firstName: 'Ronald', lastName: 'Mendoza', img: '' },
    { firstName: 'Anna', lastName: 'Fuller', img: '' }
  ];
  @Input() administrators = [
    { firstName: 'Sean', lastName: 'Jackson', img: '' },
    { firstName: 'Anna', lastName: 'Fuller', img: '' },
    { firstName: 'Philip', lastName: 'Hall', img: '' }
  ];

  @Input() possibleAdmins = [
    { firstName: 'Caitlin', lastName: 'Ingram', img: '' },
    { firstName: 'Cecil', lastName: 'Ferrell', img: '' },
    { firstName: 'Francisca', lastName: 'Carr', img: '' },
    { firstName: 'Heather', lastName: 'Morales', img: '' },
    { firstName: 'Jack', lastName: 'Phillips', img: '' }
  ];
  getPlaceholderName(firstName, lastName) {
    return ` ${firstName.substring(0, 1)} ${lastName.substring(0, 1)}`;
  }

  showAddAdminPanel() {
    this.showAddAdmin = !this.showAddAdmin;
    this.closePopover();
  }
  closePopover() {
    this.popoverToggleBoolean = !this.popoverToggleBoolean;
  }
  closePanelIfOpen() {
    if (this.showAddAdmin) {
      this.showAddAdmin = false;
    }
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }
}

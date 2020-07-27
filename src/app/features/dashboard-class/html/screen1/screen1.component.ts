import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-screen1',
  templateUrl: './screen1.component.html',
  styleUrls: ['./screen1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Screen1Component implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.badgeMultiSelect = this.badgeArr.map(badge => ({
      value: badge,
      display: badge
    }));
    console.log(this.badgeMultiSelect);
  }

  badgeArr = new Array(9).fill('');
  badgeMultiSelect = [];
  dropZoneArr = [
    { title: 'primary', popoverIsOpened: false },
    { title: 'middle', popoverIsOpened: false },
    { title: 'secondary', popoverIsOpened: false },
    { title: 'higher secondary', popoverIsOpened: false }
  ];

  //deletepopover toggle
  deletePopoverState = false;
  toggleDeletePopover() {
    this.deletePopoverState = !this.deletePopoverState;
  }

  //multiselect implementation
  activeArr = [];
  tempActiveArr = [];
  multiselectPopoverState = false;

  isActive(value) {
    return this.tempActiveArr.indexOf(value) !== -1;
  }
  openMultiSelect() {
    this.tempActiveArr = [...this.activeArr];
  }

  closeWithoutTick() {
    this.tempActiveArr = [];
  }
  toggleOption(value) {
    let valueIsCurrentlyActive = this.tempActiveArr.indexOf(value) !== -1;
    if (valueIsCurrentlyActive) {
      this.tempActiveArr = this.tempActiveArr.filter(
        currentValue => value !== currentValue
      );
    } else {
      this.tempActiveArr = [...this.tempActiveArr, value];
    }
    console.log(this.tempActiveArr);
  }

  eduTickClick() {
    this.multiselectPopoverState = !this.multiselectPopoverState;
    this.activeArr = [...this.tempActiveArr];
    console.log(this.activeArr);
  }
}

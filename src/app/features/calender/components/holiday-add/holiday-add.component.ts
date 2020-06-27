import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HolidayEditModel } from '../../models/holiday-edit.model';
import { FormGroup, FormControl } from '@angular/forms';
import { stringify } from 'querystring';
import { HolidayModel } from '../../models/holiday.model';

@Component({
  selector: 'edu-holiday-add',
  templateUrl: './holiday-add.component.html',
  styleUrls: ['./holiday-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HolidayAddComponent implements OnInit {
  @Input() mode: Observable<HolidayEditModel|'addMode'>;
  @Output() edit = new EventEmitter<HolidayModel>();
  @Output() add = new EventEmitter<HolidayModel>();

  addHolidayForm: FormGroup;
  editHolidayForm: FormGroup;
  constructor() { }
  addHoliday(){
    console.log(this.addHolidayForm.value)
    this.add.emit(this.addHolidayForm.value);
    this.addHolidayForm.reset();
  }
  editHoliday() {
    this.edit.emit(this.editHolidayForm.value);
  }
  ngOnInit(): void {
    this.addHolidayForm = new FormGroup({
      name: new FormControl('Holiday Name'),
      date: new FormControl('')
    })
    this.mode.subscribe((mode: HolidayEditModel) => {
      if(mode.editedHoliday) {
        this.editHolidayForm = new FormGroup({
          id: new FormControl(mode.editedHoliday.id),
          name: new FormControl(mode.editedHoliday.name),
          date: new FormControl(mode.editedHoliday.date),
          nationalCalendarId: new FormControl(mode.editedHoliday.nationalCalendarId),
          termId: new FormControl(mode.editedHoliday.termId),
          nationalHoliday: new FormControl(mode.editedHoliday.nationalHoliday)
        })
      }
    })
  }

}

import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { IAcademicYear, TermDetailsDto } from 'src/app/core/models/timetable';
import * as moment from 'moment';
import { AcademicYearService } from 'src/app/root-store/academicYear.service';

@Component({
  selector: 'edu-extended-datepicker',
  templateUrl: './extended-datepicker.component.html',
  styleUrls: ['./extended-datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExtendedDatepickerComponent implements OnInit {
  dateRangeCtrl = new FormControl(null);
  yearCtrl = new FormControl('');
  termCtrl = new FormControl('');
  datepickerOption = {
    isRange: true,
    inline: true,
    displayFormat: 'DD/MM/YY'
  };

  @Input() academicYears = [];
  @Input() terms = [];

  @Output() dateChange = new EventEmitter();
  academicYears$ = this.academiYearService.entities$;
  constructor(private academiYearService: AcademicYearService) {}

  ngOnInit(): void {
    // this.dateRangeCtrl.valueChanges.subscribe(value => {
    //   if (value) {
    //     const [start, end] = value.split(' - ');
    //     this.dateChange.emit({ start, end });
    //   }
    // });
  }

  saveDateRange() {
    const value = this.dateRangeCtrl.value;
    if (typeof value === 'string' && value.length > 0) {
      const [start, end] = value.split(' - ');
      this.dateChange.emit(value);
    }
  }

  onDateRangeChange(event) {
    console.log(event);
  }

  getAcademicYearTitle(year: IAcademicYear) {
    const title = `${year.acadimicStart.split('-')[0]} - ${
      year.acadimicEnd.split('-')[0]
    }`;
    return title;
  }

  customTermTitle(term: TermDetailsDto) {
    const start = moment(term.termStart).format('DD MMM');
    const end = moment(term.termEnd).format('DD MMM');

    return `${start} - ${end}`;
  }
}

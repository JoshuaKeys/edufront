import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { StaffModel } from '../../models/staff.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'edu-classes-by-gender',
  templateUrl: './classes-by-gender.component.html',
  styleUrls: ['./classes-by-gender.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassesByGenderComponent implements OnInit, OnChanges {
  @Input() staffs: Observable<StaffModel[]>;
  staffsObj: Observable<StaffModel[]>;
  males: Observable<StaffModel[]>;
  females: Observable<StaffModel[]>;


  ngOnChanges(changes: SimpleChanges) {
    this.staffsObj = changes.staffs.currentValue
    this.males = changes.staffs.currentValue.pipe(
      map((staffs: StaffModel[]) => staffs.filter(staff => staff.gender.toLowerCase() === 'male'))
    )
    this.females = changes.staffs.currentValue.pipe(
      map((staffs: StaffModel[]) => staffs.filter(staff => staff.gender.toLowerCase() === 'female'))
    )
  }

  ngOnInit(): void {
    this.staffsObj = this.staffs;
    this.males = this.staffs.pipe(
      map(staffs => staffs.filter(staff => staff.gender.toLowerCase() === 'male'))
    )
    this.females = this.staffs.pipe(
      map(staffs => staffs.filter(staff => staff.gender.toLowerCase() === 'female'))
    )
  }
  constructor() { }
}

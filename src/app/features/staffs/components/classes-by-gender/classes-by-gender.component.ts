import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { StaffModel } from '../../models/staff.model';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'edu-classes-by-gender',
  templateUrl: './classes-by-gender.component.html',
  styleUrls: ['./classes-by-gender.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassesByGenderComponent implements OnInit {
  @Input() staffs: Observable<StaffModel[]>;

  males: Observable<StaffModel[]>;
  females: Observable<StaffModel[]>;
  constructor() { }

  ngOnInit(): void {
    this.males = this.staffs.pipe(
      map(staffs => staffs.filter(staff => staff.gender.toLowerCase() === 'male'))
    )
    this.females = this.staffs.pipe(
      map(staffs => staffs.filter(staff => staff.gender.toLowerCase() === 'female'))
    )
  }

}

import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { StaffModel } from '../../models/staff.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'edu-classes-alphabetically',
  templateUrl: './classes-alphabetically.component.html',
  styleUrls: ['./classes-alphabetically.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassesAlphabeticallyComponent implements OnInit {
  @Input() staffs: Observable<StaffModel[]>;
  alphabetObj: Observable<any>
  constructor() { }

  ngOnInit(): void {
    this.alphabetObj = this.staffs.pipe(
      map(staff => {
        return this.sortByAlphabet(staff);
      })
    )
  }
  createAlphabetObj(staffs: StaffModel[]) {
    let alphabetSet = new Set();
    staffs.forEach(staff => alphabetSet.add(staff.firstName.slice(0, 1).toLowerCase()));
    return Array.from(alphabetSet).map(item => ({
      alphabet: item,
      items: []
    }))
  }
  sortByAlphabet(staffs: StaffModel[]) {
    let alphabetObj = this.createAlphabetObj(staffs);

    staffs.forEach(item => {
      let firstAlphbet = item.firstName.slice(0, 1);
      let idx = alphabetObj.findIndex(item => item.alphabet === firstAlphbet.toLowerCase());
      console.log(idx);
      alphabetObj[idx].items.push(item)
    })
    return alphabetObj;
  }
}

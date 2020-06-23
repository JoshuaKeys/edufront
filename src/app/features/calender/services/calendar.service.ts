import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HolidayListModel } from '../models/holiday-list.model';
import { HolidayModel } from '../models/holiday.model';
import { ClassGroupModel } from '../models/class-group.model';
import { ClassModel } from 'src/app/shared/models/class.model';

/**
 * {
  "acadimicStart": "2020-09-09",
  "acadimicEnd": "2021-08-08",
  "noOfTerm": 1,
  "schoolId": "3aabe03c-4a05-4833-ab64-0f26fbdca3ec",
  "termDetailsDtos": [
    {
      "termTitle": "Winter Term",
      "termStart": "2020-10-10",
      "termEnd": "2022-10-10",
      "priority": 0
    }
  ]
}
*/
@Injectable()
export class CalendarService {
    getHolidayList(): Observable<HolidayListModel> {
        return this.httpClient.get<HolidayListModel>(`/api/v1/holiday`);
    }
    getClassesAndGroups(): Observable<ClassGroupModel[]> {
        return this.httpClient.get<ClassGroupModel[]>('/api/v1/classGroup');
    }
    getAllClasses(): Observable<ClassModel[]> {
        return this.httpClient.get<ClassModel[]>('/api/v1/class');
      }
    constructor(private httpClient: HttpClient) {}
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HolidayListModel } from '../models/holiday-list.model';
import { HolidayModel } from '../models/holiday.model';
import { ClassGroupModel } from '../models/class-group.model';
import { ClassModel } from 'src/app/shared/models/class.model';
import { CalendarCreateModel } from '../models/calendar-create.model';

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
  createCalendar(calendarData: CalendarCreateModel) {
    return this.httpClient.post<
  }
  constructor(private httpClient: HttpClient) {}
}

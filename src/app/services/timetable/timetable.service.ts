import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  TimetableSkeleton,
  IClassSectionPeriodModel,
  ITimetableSavingModel,
  IPeriodSavedData
} from 'src/app/core/models/timetable';
import { GetClassesResponseModel } from 'src/app/shared/models/get-classes-response.model';
import { IGenericSearchReponse } from 'src/app/shared/models/generic-search.model';
import { ISectionModel } from 'src/app/shared/models/section.model';
import { StaffModel } from 'src/app/shared/models/staff.model';
import {
  SubjectModel,
  ISubjectWithTeachers
} from 'src/app/shared/models/subject.model';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  constructor(private http: HttpClient) {}

  getDayPlanner(classId: string) {
    return this.http.get<TimetableSkeleton[]>(
      `/api/v1/teachingDayPlanner/classId/${classId}`
    );
  }

  getClasses() {
    return this.http.get<GetClassesResponseModel[]>(`/api/v1/class`);
  }

  getSections() {
    return this.http.get<IGenericSearchReponse<ISectionModel>>(
      `/api/v1/classSection?pageSize=200`
    );
  }

  getStaff() {
    return this.http.get<StaffModel[]>('/api/v1/profile/context/teacher');
  }

  getAllSubjects(classId: string) {
    return this.http.get<ISubjectWithTeachers[]>(
      `/api/v1/subject/class/${classId}`
    );
  }

  submitTimetable(data: ITimetableSavingModel[]) {
    return this.http.post<ITimetableSavingModel[]>(
      '/api/v1/classSectionPeriod',
      data
    );
  }

  getAllPeriodsData() {
    return this.http.get<IPeriodSavedData[]>('/api/v1/classSectionPeriod/all');
  }
}

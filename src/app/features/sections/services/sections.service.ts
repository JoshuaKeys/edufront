import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExtendedClassModel } from '../../subjects/models/extend-class.model';
import { Observable } from 'rxjs';
import { ProfileDTOModel } from 'src/app/shared/models/profile-dto.model';
import { ClassesWithStudentsModel } from '../models/classes-with-students.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class SectionsService {
  getClasses(): Observable<ExtendedClassModel[]> {
    return this.httpClient.get<ExtendedClassModel[]>(`${environment.origin}api/v1/class`);
  }
  getStudents(classId): Observable<ProfileDTOModel[]> {
    return this.httpClient.get<ProfileDTOModel[]>(`${environment.origin}api/v1/profile/classId/${classId}`);
  }
  createClassesWithStudents(data: ClassesWithStudentsModel[]) {
    return this.httpClient.post<ClassesWithStudentsModel[]>(`${environment.origin}api/v1/classSection/createSectionList`, data)
  }
  constructor(private httpClient: HttpClient) { }
}

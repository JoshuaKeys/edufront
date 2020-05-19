import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { ClassesAndGroupsModel, } from '../models/classes-and-group.model';
import { GetClassesResponseModel } from '../models/get-classes-response.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ClassesWithoutGroupResponseModel } from '../models/classes-without-groups-response.model';
import { ClassesWithoutGroupsRequestModel } from '../models/classes-without-groups-request.model';
import { ClassesWithGroupsResponseModel } from '../models/classes-with-group-response.model';
import { ClassesWithGroupsRequestModel } from '../models/classes-with-groups-request.model';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ClassesAndGroupsService {
  getClasses(): Observable<GetClassesResponseModel[]> {
    return this.httpClient.get<GetClassesResponseModel[]>(`/api/v1/class/systemClasses`);
  }
  sendClassesWithoutGroups(requestData: ClassesWithoutGroupsRequestModel[]): Observable<ClassesWithoutGroupResponseModel> {
    return this.httpClient.post<ClassesWithoutGroupResponseModel>(`/api/v1/class/createAll`, requestData);
  }
  sendClassesWithGroups(requestData: ClassesWithGroupsRequestModel[]): Observable<ClassesWithGroupsResponseModel> {
    return this.httpClient.post<ClassesWithGroupsResponseModel>('/api/v1/classGroup/groupwithclass', requestData);
  }
  constructor(private httpClient: HttpClient) { }
}

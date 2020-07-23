import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneratedGroupsModel } from '../../models/generated-groups.model';
import { ExtendedClassModel } from 'src/app/features/subjects/models/extend-class.model';

@Injectable()
export class ConsoleClassesService {
  getGeneratedGroups(): Observable<GeneratedGroupsModel[]> {
    return this.httpClient.get<GeneratedGroupsModel[]>('/api/v1/classGroup');
  }
  getClasses(): Observable<ExtendedClassModel[]> {
    return this.httpClient.get<ExtendedClassModel[]>('/api/v1/class')
  }
  constructor(private httpClient: HttpClient) { }
}

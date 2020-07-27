import { Injectable } from "@angular/core";
import { GetClassesResponseModel } from '../models/get-classes-response.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ClassesService {
  getClasses(): Observable<GetClassesResponseModel[]> {
    return this.httpClient.get<GetClassesResponseModel[]>(`/api/v1/class/systemClasses`);
  }
  getAssignedClasses(): Observable<GetClassesResponseModel[]> {
    return this.httpClient.get<GetClassesResponseModel[]>(`/api/v1/class/`)
  }
  constructor(private httpClient: HttpClient) { }
}

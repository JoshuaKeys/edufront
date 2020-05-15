import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { ClassesAndGroupsModel, } from '../models/classes-and-group.model';
import { GetClassesResponseModel } from '../models/get-classes-response.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class ClassesAndGroupsService {
  getClasses(): Observable<GetClassesResponseModel[]> {
    return this.httpClient.get<GetClassesResponseModel[]>(`/api/v1/class/systemClasses`);
  }
  constructor(private httpClient: HttpClient) { }
}

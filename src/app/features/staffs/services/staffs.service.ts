import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetStaffResponseModel } from '../models/get-staff-response.model';

@Injectable()
export class StaffsService {
  getStaff(): Observable<GetStaffResponseModel[]> {
    return this.httpClient.get<GetStaffResponseModel[]>('/api/v1/profile/context/teacher')
  }
  constructor(private httpClient: HttpClient) { }
}

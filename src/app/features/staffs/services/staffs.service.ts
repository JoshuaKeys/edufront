import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetStaffResponseModel } from '../models/get-staff-response.model';
import { CreateStaffRequestModel } from '../models/create-staff-request.model';
import { CreateStaffResponseModel } from '../models/create-staff-response.model';
import { LogoUploadResponseModel } from 'src/app/shared/models/logo-upload-response.model';
import { StaffModel } from 'src/app/shared/models/staff.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class StaffsService {
  getStaff(): Observable<GetStaffResponseModel[]> {
    return this.httpClient.get<GetStaffResponseModel[]>(`${environment.origin}api/v1/profile/context/teacher`)
  }
  createStaff(staff: CreateStaffRequestModel): Observable<CreateStaffResponseModel> {
    return this.httpClient.post<CreateStaffResponseModel>(`${environment.origin}api/v1/profile/completeProfile`, staff);
  }
  deleteStaff(profileId: string): Observable<any> {
    return this.httpClient.delete(`${environment.origin}api/v1/profile/${profileId}`)
  }
  fetchStaffById(staff: StaffModel): Observable<any> {
    return this.httpClient.get(`${environment.origin}api/v1/profile/completeProfile/${staff.id}`)
  }
  uploadLogo(file: File): Observable<LogoUploadResponseModel> {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<LogoUploadResponseModel>(`${environment.origin}api/v1/upload/image`, formData);
  }
  constructor(private httpClient: HttpClient) { }
}

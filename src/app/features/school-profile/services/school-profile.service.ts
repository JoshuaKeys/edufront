import { Injectable } from "@angular/core";
import { CreateSchoolModel } from '../models/create-school.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LogoUploadResponseModel } from '../../../shared/models/logo-upload-response.model';
import { CountryModel } from '../models/country.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class SchoolProfileService {
  uploadLogo(file: File): Observable<LogoUploadResponseModel> {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<LogoUploadResponseModel>(`${environment.origin}api/v1/upload/image`, formData);
  }
  createSchool(schoolData: CreateSchoolModel): Observable<CreateSchoolModel> {
    return this.httpClient.post<CreateSchoolModel>(`${environment.origin}api/v1/school`, schoolData);
  }
  getCountries(): Observable<CountryModel[]> {
    return this.httpClient.get<CountryModel[]>(`${environment.origin}api/v1/country`);
  }
  constructor(private httpClient: HttpClient) { }
}

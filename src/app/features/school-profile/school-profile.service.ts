import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SchoolProfile } from './models/school-profile.interface';

@Injectable({
  providedIn: 'root'
})
export class SchoolProfileService {

  constructor(private httpClient: HttpClient) { }

  postImage(file) {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post('/api/v1/upload/image', formData);
  }

  createSchool(school: SchoolProfile) {
    return this.httpClient.post('/api/v1/school', school);
  }

  getCountries() {
    return this.httpClient.get('api/v1/country');
  }
}

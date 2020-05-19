import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}

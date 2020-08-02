import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StaffStudentService {
  constructor(private http: HttpClient) {}

  uploadProfileApi(file: File): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': '' })
    };
    const formData = new FormData();
    formData.append('file', file);
    return this.http
      .post<any>('/api/v1/profiles', formData)
      .pipe(tap(res => console.log('HTTP RES: ', res)));
  }
}

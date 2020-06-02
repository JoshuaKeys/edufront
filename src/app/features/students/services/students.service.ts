import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfileDTOModel } from '../models/profile-dto.model';
import { ClassModel } from 'src/app/shared/models/class.model';
import { StudentsXClassesModel } from '../models/students-x-classes.model';
import { StudentModel } from '../models/student.model';

@Injectable()
export class StudentsService {
  getAllStudents(): Observable<StudentsXClassesModel[]> {
    return this.httpClient.get<StudentsXClassesModel[]>('/api/v1/profile/context/student');
  }
  getAllClasses(): Observable<ClassModel[]> {
    return this.httpClient.get<ClassModel[]>('/api/v1/class');
  }
  createStudent(student: StudentModel): Observable<StudentModel> {
    return this.httpClient.post<StudentModel>('/api/v1/profile/completeProfile', student);
  }
  deleteStudent(student: StudentModel): Observable<any> {
    return this.httpClient.delete<any>(`/api/v1/profile/${student.profileDto.id}`)
  }
  getStudentById(student: StudentModel): Observable<StudentModel> {
    return this.httpClient.get<StudentModel>(`/api/v1/profile/completeProfile/${student.profileDto.id}`)
  }
  constructor(private httpClient: HttpClient) { }
}

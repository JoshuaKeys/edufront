import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateSubjModel } from '../models/create-subject.model';
import { SubjectCreationSuccessModel } from '../models/subject-creation-success.model';
import { PostClassSubjectModel } from '../models/post-class-subject.model';
import { PostClassSubjectResponseModel } from '../models/post-class-subject-response.model';
import { SubjectModel } from '../models/_subject.model';
import { ISubjectWithTeachers } from '../models/subject.model';

@Injectable()
export class SubjectsService {
  getAllSubjects(): Observable<ISubjectWithTeachers[]> {
    return this.httpClient.get<ISubjectWithTeachers[]>('/api/v1/subject');
  }
  createSubject(subject: CreateSubjModel): Observable<ISubjectWithTeachers> {
    return this.httpClient.post<ISubjectWithTeachers>('/api/v1/subject', subject);
  }
  postClassSubjects(classSubject: PostClassSubjectModel[]): Observable<PostClassSubjectResponseModel[]> {
    return this.httpClient.post<PostClassSubjectResponseModel[]>('/api/v1/class/updateAll', classSubject)
  }
  constructor(private httpClient: HttpClient) { }
}


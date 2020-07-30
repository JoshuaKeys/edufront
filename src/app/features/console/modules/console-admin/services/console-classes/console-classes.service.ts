import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneratedGroupsModel } from '../../models/generated-groups.model';
import { ExtendedClassModel } from 'src/app/features/subjects/models/extend-class.model';
import { ConsoleSectionModel } from '../../models/console-section.model';
import { pluck, tap, map } from 'rxjs/operators';
import { StudentModel } from 'src/app/shared/models/student.model';
import { StaffModel } from 'src/app/shared/models/staff.model';
import { SubjectModel, ISubjectWithTeachers } from 'src/app/shared/models/subject.model';
import { CreateSubjModel } from 'src/app/shared/models/create-subject.model';
import { SubjectCreationSuccessModel } from 'src/app/shared/models/subject-creation-success.model';
import { LogoUploadResponseModel } from 'src/app/shared/models/logo-upload-response.model';
import { v4 } from 'uuid'
import { SectionModel } from 'src/app/shared/models/section.model';
import { ClassesAndGroupsModel } from 'src/app/features/classes-and-groups/models/classes-and-group.model';
import { GroupClassMapModel } from 'src/app/features/classes-and-groups/models/group-class-map.model';
import { ClassGroupModel } from 'src/app/features/calender/models/class-group.model';
import { GroupWithClasses } from '../../models/group-with-classes.model';
@Injectable()
export class ConsoleClassesService {
  getGeneratedGroups(): Observable<GeneratedGroupsModel[]> {
    return this.httpClient.get<GeneratedGroupsModel[]>('/api/v1/classGroup');
  }
  getClasses(): Observable<ExtendedClassModel[]> {
    return this.httpClient.get<ExtendedClassModel[]>('/api/v1/class/systemClasses')
  }
  getAssignedClasses(): Observable<ExtendedClassModel[]> {
    return this.httpClient.get<ExtendedClassModel[]>('/api/v1/class')
  }
  deleteGroup(group: GeneratedGroupsModel): Observable<any> {
    return this.httpClient.delete(`/api/v1/classGroup/${group.id}`, { responseType: 'text' })
  }
  deleteClass(classItem: ExtendedClassModel) {
    return this.httpClient.delete(`/api/v1/class/${classItem.id}`)
  }
  addClass(classItem: ExtendedClassModel[]) {
    return this.httpClient.post<ExtendedClassModel[]>(`/api/v1/class/createAll`, classItem);
  }
  getSectionData(): Observable<ConsoleSectionModel[]> {
    return this.httpClient.get<ConsoleSectionModel[]>(`/api/v1/classSection`).pipe(
      pluck('content')
    )
  }
  getAllStudents(): Observable<StaffModel[]> {
    return this.httpClient.get<StaffModel[]>(`/api/v1/profile/context/student`);
  }
  getStudentsInSection(section: ConsoleSectionModel): Observable<StaffModel[]> {
    return this.httpClient.get<StaffModel[]>(`/api/v1/profile/sectionId/${section.id}`).pipe(
      map(staffData => staffData.map(staffItem => {
        staffItem['sectionId'] = section.id;
        return staffItem;
      }))
    )
  }
  createGroup(group: ClassGroupModel): Observable<ClassGroupModel> {
    return this.httpClient.post<ClassGroupModel>('/api/v1/classGroup', group)
  }
  uploadLogo(file: File): Observable<LogoUploadResponseModel> {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<LogoUploadResponseModel>('/api/v1/upload/image', formData);
  }
  getAllFullClasses(): Observable<ExtendedClassModel[]> {
    return this.httpClient.get<ExtendedClassModel[]>(`api/v1/class`)
  }
  getAllSubjects(): Observable<ISubjectWithTeachers[]> {
    return this.httpClient.get<ISubjectWithTeachers[]>(`/api/v1/subject`);
  }
  getFullClass(classItem: ExtendedClassModel): Observable<ExtendedClassModel> {
    return this.httpClient.get<ExtendedClassModel>(`api/v1/class/${classItem.id}`);
  }
  createSubject(subject: CreateSubjModel): Observable<ISubjectWithTeachers> {
    return this.httpClient.post<ISubjectWithTeachers>('/api/v1/subject', subject);
  }
  createStudent(student: StudentModel): Observable<StudentModel> {
    return this.httpClient.post<StudentModel>('/api/v1/profile/completeProfile', student);
  }
  deleteSubjectFromClass(classId: string, subjectId: string): Observable<any> {
    return this.httpClient.delete<any>(`/api/v1/class/classSubject/${classId}/subject/${subjectId}`)
  }
  assignSubjectToClass(classItem: ExtendedClassModel, subject: SubjectModel): Observable<SubjectModel> {
    const modifiedClassItem = classItem.subjects.map(subject => subject.id)
    modifiedClassItem.push(subject.id)
    delete classItem.subjects
    classItem['subjectIds'] = modifiedClassItem;
    return this.httpClient.put<SubjectModel>(`/api/v1/class/${classItem.id}`, classItem)
  }
  updateSectionData(sectionId: string, studentId: string): Observable<any> {
    return this.httpClient.put<any>(`/api/v1/profile/section/${sectionId}`, [studentId])
  }
  getStudentsById(classItem: ExtendedClassModel): Observable<StaffModel[]> {
    return this.httpClient.get<StaffModel[]>(`/api/v1/profile/classId/${classItem.id}`);
  }
  addNewSection(sectionObj): Observable<SectionModel> {
    return this.httpClient.post<SectionModel>('/api/v1/classSection', sectionObj)
  }
  addMultiClasses(classes: ExtendedClassModel[]): Observable<ExtendedClassModel[]> {
    return this.httpClient.post<ExtendedClassModel[]>('/api/v1/class/createAll', classes);
  }
  sendGroupData(groups: GroupWithClasses[]): Observable<ClassGroupModel[]> {
    return this.httpClient.post<ClassGroupModel[]>('/api/v1/classGroup/groupwithclass', groups)
  }
  constructor(private httpClient: HttpClient) { }
}

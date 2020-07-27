export interface SubjectModel {
  id: string;
  title: string;
}

export interface ISubjectWithTeachers {
  title: string;
  subjectIcon: string;
  subSubjects: any[];
  id: string;
  teachers?: ITeacher[];
  teacherIds?: string[]; // custom property
}

export interface ITeacher {
  profileId: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarColour: null;
  subjRefId?: string | string[]; // custom property
}

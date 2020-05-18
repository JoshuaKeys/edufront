export interface ClassesWithoutGroupsRequestModel {
  classGroupId?: string;
  grade: number;
  name: number;
  subjectIds?: Array<string>,
  teacherIds?: Array<string>
}

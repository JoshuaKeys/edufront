export interface ClassesWithGroupsResponseModel {
  id: string;
  groupdName: string;
  classes: Array<{
    id: string;
    name: string;
    grade: number;
    teacherIds: Array<string>;
    selected: boolean;
    subjectIds: Array<string>;
    classGroupId: string;
  }>
}

import { TeachingDay } from './teaching-day.model';
import { PeriodModel } from './period.model';
import { ExtendedClassModel } from '../../subjects/models/extend-class.model';

export interface ClassGroupModel {
  id?: string;
  groupName: string;
  // classes: {
  //     classGroupId?: string;
  //     grade: number;
  //     id: string;
  //     name: string;
  //     selected?: boolean;
  //     subjectIds?: string[],
  //     teacherIds?: [],
  // }[],
  classes?: ExtendedClassModel[]
  teachingDays?: TeachingDay[],
  periods?: PeriodModel[]
}

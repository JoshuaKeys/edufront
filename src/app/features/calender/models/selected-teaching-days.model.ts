import { TeachingDay } from './teaching-day.model';

export interface SelectedTeachingDaysModel {
    groupId: string;
    teachingDays: TeachingDay[]
}
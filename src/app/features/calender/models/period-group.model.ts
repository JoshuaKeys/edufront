import { TeachingDay } from './teaching-day.model';
import { PeriodModel } from './period.model';

export interface PeriodGroupModel {
    id: string;
    groupName: string;
    classes: {
        classGroupId?: string;
        grade: number;
        id: string;
        name: string;
        selected?: boolean;
        subjectIds?: string[],
        teacherIds?: [],
    }[],
    // teachingDays?: TeachingDay[]
    periods: PeriodModel[]
}
import { TeachingDay } from './teaching-day.model';

export interface ClassGroupModel {
    id: string;
    groupName: string;
    classes: {
        classGroupId?: string;
        grade: number;
        id: string;
        name: string;
        selected?: boolean;
        subjectIds?: string[],
        teacherIds?: []
    }[],
    teachingDays?: TeachingDay[]
}
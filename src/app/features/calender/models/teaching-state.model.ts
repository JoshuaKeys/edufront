import { TeachingDay } from './teaching-day.model';
import { ClassGroupModel } from './class-group.model';
import { ClassModel } from 'src/app/shared/models/class.model';
import { PeriodModel } from './period.model';

export interface TeachingStateModel {
    teachingDays?: TeachingDay[];
    classesAndGroups?: ClassGroupModel[];
    classes?: ClassModel[];
    periods?: PeriodModel[];
}
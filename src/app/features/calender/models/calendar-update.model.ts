import { ExtendedClassModel } from '../../subjects/models/extend-class.model';
import { TeachingDay } from './teaching-day.model';
import { PeriodModel } from './period.model';

export interface CalendarUpdateModel {
    classes: ExtendedClassModel[];
    teachingDays: TeachingDay[];
    teachingPeriods: PeriodModel[];
}
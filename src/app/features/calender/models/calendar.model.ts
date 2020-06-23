import { TermsAndDates } from './terms-and-date.model';
import { VacationModel } from './vacation.model';
import { ClassGroupModel } from './class-group.model';
import { TeachingDay } from './teaching-day.model';
import { PeriodModel } from './period.model';

export interface CalendarModel {
    currentAcademicYear?: {
        startDate: string;
        endDate: string;
    },
    schoolTerms?: number,
    termsAndDates?: TermsAndDates[],
    vacations?: VacationModel[],
    teaching?: {
        teachingDays?: TeachingDay[],
        classesAndGroups?: ClassGroupModel[],
        periods?: PeriodModel[]
    }
}
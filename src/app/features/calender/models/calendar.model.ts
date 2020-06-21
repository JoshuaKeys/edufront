import { TermsAndDates } from './terms-and-date.model';
import { VacationModel } from './vacation.model';
import { ClassGroupModel } from './class-group.model';

export interface CalendarModel {
    currentAcademicYear?: {
        startDate: string;
        endDate: string;
    },
    schoolTerms?: number,
    termsAndDates?: TermsAndDates[],
    vacations?: VacationModel[],
    teachingDays?: string[],
    classesAndGroups?: ClassGroupModel[]
}
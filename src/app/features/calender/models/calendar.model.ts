import { TermsAndDates } from './terms-and-date.model';
import { VacationModel } from './vacation.model';

export interface CalendarModel {
    currentAcademicYear?: {
        startDate: string;
        endDate: string;
    },
    schoolTerms?: number,
    termsAndDates?: TermsAndDates[],
    vacations?: VacationModel[]
}
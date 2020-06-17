import { TermsAndDates } from './terms-and-date.model';

export interface CalendarModel {
    currentAcademicYear?: {
        startDate: string;
        endDate: string;
    },
    schoolTerms?: number,
    termsAndDates?: TermsAndDates[]
}
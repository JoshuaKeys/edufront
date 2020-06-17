import { TermsAndDates } from './terms-and-date.model';

export interface PreviewModel {
    datePreview?: {
        route: string;
        startDate?: string;
        endDate?: string
    },
    schoolTerms?: {
        route: string;
        termsNumber?: number;
    },
    termsNamesAndDates?: {
        route: string;
        items?: TermsAndDates[]
    },
    termVacations?: {
        route: string;
        items: {vacationName: string; vacationStartDate: string; vacationEndDate: string}[]
    }
}
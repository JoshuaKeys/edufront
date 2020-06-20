import { TermsAndDates } from './terms-and-date.model';
import { VacationModel } from './vacation.model';

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
        items?: VacationModel[]
    }
    teachingDays?: {
        route: string;
        items?: string[];
    }
}
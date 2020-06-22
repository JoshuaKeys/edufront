import { TermsAndDates } from './terms-and-date.model';
import { VacationModel } from './vacation.model';
import { TeachingDay } from './teaching-day.model';
import { ClassGroupModel } from './class-group.model';
import { PeriodModel } from './period.model';
import { PeriodGroupModel } from './period-group.model';

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
        items?: TeachingDay[];
        classesAndGroupItems?: ClassGroupModel[]
    },
    periods?: {
        route: string;
        items?: PeriodModel[],
        classesAndGroupItems?: PeriodGroupModel[]
    }
}
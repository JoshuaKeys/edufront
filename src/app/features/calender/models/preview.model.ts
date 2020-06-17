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
        items: {termName: string; termStartDate: string; termEndDate: string}[]
    },
    termVacations?: {
        route: string;
        items: {vacationName: string; vacationStartDate: string; vacationEndDate: string}[]
    }
}
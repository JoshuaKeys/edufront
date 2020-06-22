import { PeriodModel } from './period.model';

export interface TeachingDay {
    day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
    period?: number;
    selected: boolean;
    periods?: PeriodModel[]
    periodSelected?: boolean;
}
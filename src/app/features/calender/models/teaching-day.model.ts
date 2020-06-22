export interface TeachingDay {
    day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
    period?: number;
    selected: boolean;
    periodSelected?: boolean;
}
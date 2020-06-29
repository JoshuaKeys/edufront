export interface BreakModel {
    title: string;
    firstBreak: string;
    day: Array<'Mon'|'Tue'|'Wed'|'Thu'|'Fri'|'Sat'|'Sun'>;
    after: Array<number>;
    duration: string;
}
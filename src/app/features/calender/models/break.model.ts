export interface BreakModel {
    name: string;
    firstBreak: string;
    day: Array<'Mon'|'Tue'|'Wed'|'Thu'|'Fri'|'Sat'|'Sun'>;
    after: Array<number>;
    duration: string;
}
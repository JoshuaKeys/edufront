export interface SpecialPeriod{
    // isSingleDay:boolean,
    time:string,
    text:string,
    // changeTimeToSingle:boolean, 
    //changeTimeToSingle >>  need a better way to call this, this changes the time from 2 unit of row to 1 unit of row
    color?:string,
    start:Day,
    end:Day,
    inFirstHalf?:boolean 
    //inFirstHalf >> this property allows you to determine if the special period is in the top or bottom block
    //should always be used if [changeTimeToSingle] is set to false, will be taken to be false by default
    classes?:string[],
    //ignore classes
}

export interface Period{
    key:any,
    value:any
}
export interface TimetableModel {
    mon?:Period[],
    tue?:Period[],
    wed?:Period[],
    thu?:Period[],
    fri?:Period[],
    sat?:Period[],
    sun?:Period[],
}
export interface Time{
    value:"",
    isSingleRow?:boolean
}

export enum Day{
    mon = 'mon',
    tue = 'tue',
    wed = 'wed',
    thu = 'thu',
    fri = 'fri',
    sat = 'sat',
    sun = 'sun'
}
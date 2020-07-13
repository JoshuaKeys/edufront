export interface TeachingDayPlannerModel {
  classGroupId: string;
  classId: string;
  weekday: string;
  noOfPeriod: number;
  assemblyStartTime: string;
  assemblyDuration: number;
  periodPlanners: {
    duration: number;
    name: string;
    index: number;
  }[];
  breaks: {
    breakTitle: string;
    periodIntervalDuration: number;
    endPeriod: number;
  }[];
}

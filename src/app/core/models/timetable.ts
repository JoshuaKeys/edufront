export interface TimetableSkeleton {
  id: string;
  classGroupId: string;
  classId: string;
  weekday: string;
  noOfPeriod: number;
  periodStartTime: null;
  assemblyStartTime: string;
  assemblyDuration: number;
  breaks: Break[];
  periodPlanners: PeriodPlanner[];
}

export interface Break {
  id: string;
  breakTitle: string;
  endPeriod: number;
  breakDuration: number;
}

export interface PeriodPlanner {
  id: string;
  duration: number;
  name: string;
  index: number;
}

export interface IClassSectionPeriodModel {
  acadimicYearId?: string;
  sectionId?: string;
  classId: string;
  periodRequestQ: PeriodRequestQ[];
}

export interface PeriodRequestQ {
  periodId: string;
  subjectId: string;
  teacherId: string;
}

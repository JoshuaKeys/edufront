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

export interface ITimetableSavingModel {
  acadimicYearId: string;
  classId: string;
  termDetailId: string;
  sectionList: ISectionPeriodModel[];
}

export interface IClassSectionPeriodModel {
  acadimicYearId?: string;
  classId: string;
  sectionId: string;
  periodRequestQ: PeriodRequestQ[];
}

export interface ISectionPeriodModel {
  sectionId: string;
  periodRequestQ: PeriodRequestQ[];
}

export interface PeriodRequestQ {
  periodId: string;
  subjectId: string;
  teacherId: string;
}

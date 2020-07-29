export interface TimetableSkeleton {
  id: string;
  classGroupId: string;
  classId: string;
  weekday: string;
  noOfPeriod: number;
  periodStartTime: null;
  assemblyTitle: string;
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

export interface IAcademicYear {
  acadimicEnd: string;
  acadimicStart: string;
  id?: string;
  noOfTerm: number;
  schoolId: string;
  termDetailsDtos: TermDetailsDto[];
}

export interface TermDetailsDto {
  academicYearId: string;
  priority: number;
  termEnd: string;
  termId?: string;
  termStart: string;
  termTitle: string;
}

export interface IPeriodSavedData {
  id: string;
  classId: string;
  sectionId: string;
  periodId: string;
  subjectId: string;
  teacherId: string;
  termDetailId: string;
  acadimicYearId: string;
}

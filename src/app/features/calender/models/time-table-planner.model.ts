import { TeachingDayPlannerModel } from './teaching-day-planner.model';

export interface TimeTablePlanner {
  intervalDuration: number;
  academicYearId: string;
  termId: string;
  teachingDayPlanner: TeachingDayPlannerModel[]
}

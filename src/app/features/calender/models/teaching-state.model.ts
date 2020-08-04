import { TeachingDay } from './teaching-day.model';
import { ClassGroupModel } from './class-group.model';
import { ClassModel } from 'src/app/shared/models/class.model';
import { PeriodModel } from './period.model';
import { SelectionModel } from './selection.model';
import { CalendarUpdateModel } from './calendar-update.model';

export interface TeachingStateModel {
  teachingDays?: TeachingDay[];
  periods?: PeriodModel[];
  classesAndGroups?: ClassGroupModel[];
  classes?: ClassModel[];
  selection?: SelectionModel;
  startTime?: string;
  calendarEdit?: CalendarUpdateModel;
  consequences?: string[];
  sameNoOfPeriods?: boolean;
  sameTeachingDays?: boolean;
  sameStartTime?: boolean;
  sameBreakSchedule?: boolean;
  hasAssembly?: boolean;
}

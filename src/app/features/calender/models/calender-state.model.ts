import { CalendarModalModel } from './calender-modal.model'
import { PreviewModel } from './preview.model';
import { CalendarModel } from './calendar.model';
import { HolidayModel } from './holiday.model';
import { EntityState } from '@ngrx/entity';
import { HolidayEditModel } from './holiday-edit.model';
import { TeachingDay } from './teaching-day.model';
import { ClassGroupModel } from './class-group.model';
import { ClassModel } from 'src/app/shared/models/class.model';
import { PeriodModel } from './period.model';

export interface CalendarStateModel {
    modal: CalendarModalModel,
    preview: PreviewModel,
    calendarData: CalendarModel,
    holidays?: {
        holidayList: EntityState<HolidayModel>;
        holidayEdit: HolidayEditModel
    },
    teaching: {
        teachingDays?: TeachingDay[],
        classesAndGroups: ClassGroupModel[],
        classes: ClassModel[],
        periods: PeriodModel[],
    }

}
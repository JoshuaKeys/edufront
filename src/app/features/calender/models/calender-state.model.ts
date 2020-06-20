import { CalendarModalModel } from './calender-modal.model'
import { PreviewModel } from './preview.model';
import { CalendarModel } from './calendar.model';
import { HolidayModel } from './holiday.model';
import { EntityState } from '@ngrx/entity';
import { HolidayEditModel } from './holiday-edit.model';

export interface CalendarStateModel {
    modal: CalendarModalModel,
    preview: PreviewModel,
    calendarData: CalendarModel,
    holidays?: {
        holidayList: EntityState<HolidayModel>;
        holidayEdit: HolidayEditModel
    }
}
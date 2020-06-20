import { CalendarModalModel } from './calender-modal.model'
import { PreviewModel } from './preview.model';
import { CalendarModel } from './calendar.model';

export interface CalendarStateModel {
    modal: CalendarModalModel,
    preview: PreviewModel,
    calendarData: CalendarModel
}
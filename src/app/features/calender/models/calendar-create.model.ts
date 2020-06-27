import { HolidayCreateModel } from './holiday-create.model';
import { TermCreateModel } from './term-create.model';
import { VacationCreateModel } from './vacation-create.model';

export interface CalendarCreateModel {
    holidays: HolidayCreateModel[];
    term: TermCreateModel,
    vacations: VacationCreateModel[]
}
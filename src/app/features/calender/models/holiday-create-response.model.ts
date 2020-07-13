import { HolidayModel } from './holiday.model';
import { TermCreateResponseModel } from './term-create-response.model';
import { VacationCreateModel } from './vacation-create.model';

export interface HolidayCreateResponseModel {
    holidays: HolidayModel[],
    term: TermCreateResponseModel,
    vacations: VacationCreateModel[]
}
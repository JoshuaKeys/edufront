import { HolidayModel } from './holiday.model';

export interface HolidayListModel {
    content: HolidayModel[];
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: {
        offset: number;
        pageNumber: 0;
        pageSize: number;
        paged: boolean;
        sort: {
            sorted: boolean;
            unsorted: boolean;
        };
        unpaged: true;
    };
    size: number;
    sort: {
        sorted: boolean;
        unsorted: boolean;
    };
    totalElements: number;
    totalPages: number;
}
export interface HolidayCreateModel {
    date: string;
    name: string;
    nationalCalendarId?: string;
    isNationalHoliday?: boolean;
    termId?: string;
  }
  
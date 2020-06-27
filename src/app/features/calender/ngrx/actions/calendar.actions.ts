import { createAction, props } from '@ngrx/store';
import { HolidayListModel } from '../../models/holiday-list.model';
import { HolidayModel } from '../../models/holiday.model';
import { TeachingDay } from '../../models/teaching-day.model';
import { ClassGroupModel } from '../../models/class-group.model'
import { ClassModel } from 'src/app/shared/models/class.model';
import { Day } from 'src/app/shared/components/timetable/timetable.interface';
import { SelectedPeriodModel } from '../../models/selected-period.model';
import { PeriodModel } from '../../models/period.model';
import { SelectedPeriods } from '../../models/selected-periods.model';
import { CalendarCreateModel } from '../../models/calendar-create.model';
import { HolidayCreateResponseModel } from '../../models/holiday-create-response.model';
export const setPreviewAcademicYearStartDate = createAction(
    '[AcademicYearQuestionComponent] setPreviewAcademicYearStartDate',
    props<{startDate: string}>()
);
export const setPreviewAcademicYearEndDate = createAction(
    '[AcademicYearQuestionComponent] setPreviewAcademicYearEndDate',
    props<{endDate: string}>()
);
export const setAcademicYearStartDate = createAction(
    '[AcademicYearQuestionComponent] setAcademicYearStartDate',
    props<{startDate: string}>()
);
export const setAcademicYearEndDate = createAction(
    '[AcademicYearQuestionComponent] setAcademicYearEndDate',
    props<{endDate: string}>()
);
export const setSchoolTerms = createAction(
    '[SchoolTermsQuestionComponent] setSchoolTerms',
    props<{schoolTerms: number}>()
);
export const toggleSelectedTerms = createAction(
    '[SchoolTermsQuestionComponent] toggleSelectedTerms',
    props<{schoolTerms: number}>()
);
export const initializeTermsAndDates = createAction(
    '[SchoolTermsQuestionComponent] initializeTermsAndDates'
);
export const setTermName = createAction(
    '[TermNamesAndDatesComponent] setTermName',
    props<{idx: number, termName: string}>()
);
export const setTermStartDate = createAction(
    '[TermNamesAndDatesComponent] setTermStartDate',
    props<{idx: number, startDate: string}>()
);
export const setTermEndDate = createAction(
    '[TermNamesAndDatesComponent] setTermEndDate',
    props<{idx: number, endDate: string}>()
);
export const initializeVacations = createAction(
    '[SchoolTermsQuestionComponent] initializeVacations'
);
export const addVacation = createAction(
    '[VacationNamesAndDatesComponent] addVacation'
);
export const setVacationName = createAction(
    '[VacationNamesAndDatesComponent] setVacationName',
    props<{idx: number, vacationName: string}>()
);
export const setVacationStartDate = createAction(
    '[VacationNamesAndDatesComponent] setVacationStartDate',
    props<{idx: number, startDate: string}>()
);
export const setVacationEndDate = createAction(
    '[VacationNamesAndDatesComponent] setVacationEndDate',
    props<{idx: number, endDate: string}>()
);
export const fetchHolidaysRequest = createAction(
    '[HolidayListComponent] fetchHolidaysRequest'
);
export const fetchHolidaysResponse = createAction(
    '[CalendarEffects] fetchHolidaysResponse',
    props<{holidays: HolidayListModel}>()
);
export const deleteHoliday = createAction(
    '[HolidayListComponent] deleteHoliday',
    props<{holiday: HolidayModel}>()
);
export const editHoliday = createAction(
    '[HolidayListComponent] editHoliday',
    props<{holiday: HolidayModel}>()
);
export const editHolidayRequest = createAction(
    '[HolidayListComponent] editHolidayRequest',
    props<{holiday: HolidayModel}>()
);
export const addHoliday = createAction(
    '[HolidayListComponent] addHoliday',
    props<{holiday: HolidayModel}>()
);
export const toggleSelectedDay = createAction(
    '[TeachingDaysComponent] toggleSelectedDay',
    props<{day: TeachingDay}>()
);
export const fetchClassesAndGroups = createAction(
    '[TeachingDayForClassQuestion] fetchClassesAndGroups'
);
export const fetchClassesAndGroupsSuccess = createAction(
    '[CalendarEffects] fetchClassesAndGroupsSuccess',
    props<{classesAndGroups: ClassGroupModel[]}>()
);
export const setDefaultTeachingDays = createAction(
    '[TeachingDaysComponent] setDefaultTeachingDays'
);
export const toggleClassesGroupActive = createAction(
    '[TeachingDayForClassQuestion] toggleClassGroupActive',
    props<{day: TeachingDay, classesGroup: ClassGroupModel}>()
)
export const getAllClassesRequest = createAction(
    '[TeachingDayForClassQuestion] getAllClassesRequest'
);
export const getAllClassesResponse = createAction(
    '[CalendarEffects] getAllClassesResponse',
    props<{classes: ClassModel[]}>()
);
export const reassignClass = createAction(
    '[TeachingDayForClassQuestion] reassignClass',
    props<{class: ClassModel, classesGroup: ClassGroupModel}>()
);
export const addClassesGroup = createAction(
    '[TeachingDayForClassQuestion] addClassesGroup',
    props<{generatedGroupId: string}>()
);
export const setNumberOfPeriods = createAction(
    '[NumberOfPeriodsComponent] setNumberOfPeriods',
    props<{numberOfPeriods: number}>()
);
export const assignPeriodsToTeachingDates = createAction(
    '[NumberOfPeriodsComponent] assignPeriodsToTeachingDates',
    props<{numberOfPeriods: number}>()
);
export const selectTeachingDay = createAction(
    '[TeachingPeriodsPerDayComponent] selectTeachingDay',
    props<SelectedPeriodModel>()
);
export const updateSelectedTeachingDaysRequest = createAction(
    '[TeachingPeriodsPerDayComponent] updateSelectedTeachingDaysRequest',
    props<{updateTo: number}>()
)
export const updateSelectedPeriods = createAction(
    '[TeachingPeriodsPerDayComponent] updateSelectedTeachingDays',
    props<{updateTo: number, selectedPeriods: SelectedPeriods[]}>()
);
export const addPeriodsToGroup = createAction(
    '[TeachingPeriodsPerDayComponent] addPeriodsToGroup',
    props<{generatedGroupId: string}>()
);
export const removeVacation = createAction(
    '[VacationNamesAndDatesComponent] removeVacation',
    props<{index: number}>()
);
export const createCalendarRequest = createAction(
    '[HolidayListComponent] createCalendarRequest'
);
export const createCalendarSuccess = createAction(
    '[CalendarEffects] createCalendarSuccess',
    props<{calendarResponse: HolidayCreateResponseModel}>()
)
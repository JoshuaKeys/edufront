import { createAction, props } from '@ngrx/store';
import { HolidayListModel } from '../../models/holiday-list.model';
import { HolidayModel } from '../../models/holiday.model';
import { TeachingDay } from '../../models/teaching-day.model';
import { ClassGroupModel } from '../../models/class-group.model';
import { ClassModel } from 'src/app/shared/models/class.model';
import { Day } from 'src/app/shared/components/timetable/timetable.interface';
import { SelectedPeriodModel } from '../../models/selected-period.model';
import { PeriodModel } from '../../models/period.model';
import { SelectedPeriods } from '../../models/selected-periods.model';
import { CalendarCreateModel } from '../../models/calendar-create.model';
import { HolidayCreateResponseModel } from '../../models/holiday-create-response.model';
import { BreakModel, BreakModel2 } from '../../models/break.model';
export const setPreviewAcademicYearStartDate = createAction(
  '[AcademicYearQuestionComponent] setPreviewAcademicYearStartDate',
  props<{ startDate: string }>()
);
export const setPreviewAcademicYearEndDate = createAction(
  '[AcademicYearQuestionComponent] setPreviewAcademicYearEndDate',
  props<{ endDate: string }>()
);
export const setAcademicYearStartDate = createAction(
  '[AcademicYearQuestionComponent] setAcademicYearStartDate',
  props<{ startDate: string }>()
);
export const setAcademicYearEndDate = createAction(
  '[AcademicYearQuestionComponent] setAcademicYearEndDate',
  props<{ endDate: string }>()
);
export const setSchoolTerms = createAction(
  '[SchoolTermsQuestionComponent] setSchoolTerms',
  props<{ schoolTerms: number }>()
);
export const toggleSelectedTerms = createAction(
  '[SchoolTermsQuestionComponent] toggleSelectedTerms',
  props<{ schoolTerms: number }>()
);
export const initializeTermsAndDates = createAction(
  '[SchoolTermsQuestionComponent] initializeTermsAndDates'
);
export const setTermName = createAction(
  '[TermNamesAndDatesComponent] setTermName',
  props<{ idx: number; termName: string }>()
);
export const setTermStartDate = createAction(
  '[TermNamesAndDatesComponent] setTermStartDate',
  props<{ idx: number; startDate: string }>()
);
export const setTermEndDate = createAction(
  '[TermNamesAndDatesComponent] setTermEndDate',
  props<{ idx: number; endDate: string }>()
);
export const initializeVacations = createAction(
  '[SchoolTermsQuestionComponent] initializeVacations'
);
export const addVacation = createAction(
  '[VacationNamesAndDatesComponent] addVacation'
);
export const setVacationName = createAction(
  '[VacationNamesAndDatesComponent] setVacationName',
  props<{ idx: number; vacationName: string }>()
);
export const setVacationStartDate = createAction(
  '[VacationNamesAndDatesComponent] setVacationStartDate',
  props<{ idx: number; startDate: string }>()
);
export const setVacationEndDate = createAction(
  '[VacationNamesAndDatesComponent] setVacationEndDate',
  props<{ idx: number; endDate: string }>()
);
export const fetchHolidaysRequest = createAction(
  '[HolidayListComponent] fetchHolidaysRequest'
);
export const fetchHolidaysResponse = createAction(
  '[CalendarEffects] fetchHolidaysResponse',
  props<{ holidays: HolidayListModel }>()
);
export const deleteHoliday = createAction(
  '[HolidayListComponent] deleteHoliday',
  props<{ holiday: HolidayModel }>()
);
export const deleteHolidaySuccess = createAction(
  '[CalendarEffects] deleteHolidaySuccess',
  props<{ holiday: HolidayModel }>()
);
export const editHoliday = createAction(
  '[HolidayListComponent] editHoliday',
  props<{ holiday: HolidayModel }>()
);
export const editHolidaySuccess = createAction(
  '[CalendarEffects] editHolidaySuccess',
  props<{ holiday: HolidayModel }>()
);
export const editHolidayRequest = createAction(
  '[HolidayListComponent] editHolidayRequest',
  props<{ holiday: HolidayModel }>()
);
export const addHoliday = createAction(
  '[HolidayListComponent] addHoliday',
  props<{ holiday: HolidayModel }>()
);
export const toggleSelectedDay = createAction(
  '[TeachingDaysComponent] toggleSelectedDay',
  props<{ day: TeachingDay }>()
);
export const fetchClassesAndGroups = createAction(
  '[TeachingDayForClassQuestion] fetchClassesAndGroups'
);
export const fetchClassesAndGroupsSuccess = createAction(
  '[CalendarEffects] fetchClassesAndGroupsSuccess',
  props<{ classesAndGroups: ClassGroupModel[] }>()
);
export const setDefaultTeachingDays = createAction(
  '[TeachingDaysComponent] setDefaultTeachingDays'
);
export const toggleClassesGroupActive = createAction(
  '[TeachingDayForClassQuestion] toggleClassGroupActive',
  props<{ day: TeachingDay; classesGroup: ClassGroupModel }>()
);
export const getAllClassesRequest = createAction(
  '[TeachingDayForClassQuestion] getAllClassesRequest'
);
export const getAllClassesResponse = createAction(
  '[CalendarEffects] getAllClassesResponse',
  props<{ classes: ClassModel[] }>()
);
export const reassignClass = createAction(
  '[TeachingDayForClassQuestion] reassignClass',
  props<{
    class: ClassModel;
    classesGroup?: ClassGroupModel;
    groupId?: string;
  }>()
);
export const addClassesGroup = createAction(
  '[TeachingDayForClassQuestion] addClassesGroup',
  props<{ generatedGroupId: string }>()
);
export const setNumberOfPeriods = createAction(
  '[NumberOfPeriodsComponent] setNumberOfPeriods',
  props<{ numberOfPeriods: number }>()
);
export const assignPeriodsToTeachingDates = createAction(
  '[NumberOfPeriodsComponent] assignPeriodsToTeachingDates',
  props<{ numberOfPeriods: number }>()
);
export const selectTeachingDay = createAction(
  '[TeachingPeriodsPerDayComponent] selectTeachingDay',
  props<SelectedPeriodModel>()
);
export const updateSelectedTeachingDaysRequest = createAction(
  '[TeachingPeriodsPerDayComponent] updateSelectedTeachingDaysRequest',
  props<{ updateTo: number }>()
);
export const updateSelectedPeriods = createAction(
  '[TeachingPeriodsPerDayComponent] updateSelectedTeachingDays',
  props<{ updateTo: number; selectedPeriods: SelectedPeriods[] }>()
);
export const addPeriodsToGroup = createAction(
  '[TeachingPeriodsPerDayComponent] addPeriodsToGroup',
  props<{ generatedGroupId: string }>()
);
export const removeVacation = createAction(
  '[VacationNamesAndDatesComponent] removeVacation',
  props<{ index: number }>()
);
export const createCalendarRequest = createAction(
  '[HolidayListComponent] createCalendarRequest'
);
export const createCalendarSuccess = createAction(
  '[CalendarEffects] createCalendarSuccess',
  props<{ calendarResponse: HolidayCreateResponseModel }>()
);
export const setAllStartTime = createAction(
  '[StartTimeOfFirstPeriodComponent] setAllStartTime',
  props<{ startTime: string }>()
);
export const setStartTime = createAction(
  '[StartTimeOfFirstPeriodComponent] setStartTime',
  props<{ startTime: string }>()
);
export const selectStartTime = createAction(
  '[StartTimeOfEachPeriod] selectStartTime',
  props<SelectedPeriodModel>()
);
export const setPeriodDuration = createAction(
  '[PeriodDurationComponent] setPeriodDuration',
  props<{ periodDuration: number }>()
);
export const setPeriodInterval = createAction(
  '[PeriodIntervalComponent] setPeriodInterval',
  props<{ periodInterval: number }>()
);
export const setAssemblyData = createAction(
  '[AssemblyDetailsComponent] setAssemblyData',
  props<{ field: 'startingAt' | 'duration' | 'name'; value: number | string }>()
);
export const setGroupTeachingDays = createAction(
  '[TeachingDayForClassQuestionComponent] setGroupTeachingDays',
  props<{ groupId: string }>()
);
export const setGroupPeriods = createAction(
  '[TeachingPeriodsPerDayComponent] setGroupPeriods',
  props<{ groupId: string }>()
);
export const setGroupStartTime = createAction(
  '[StartTimeForEachPeriodComponent] setGroupStartTime',
  props<{ groupId: string }>()
);
export const initializeBreaks = createAction(
  '[DefineYourBreakComponent] initializeBreaks'
);
export const addBreak = createAction(
  '[DefineYourBreakComponent] addBreak',
  props<{ groupId: string }>()
);
export const removeBreak = createAction(
  '[DefineYourBreakComponent] removeBreak',
  props<{ groupId: string; breakIndex: number }>()
);
export const updateBreakData = createAction(
  '[DefineYourBreakComponent] updateBreakData',
  props<{
    groupId: string;
    index: number;
    field: 'title' | 'day' | 'after' | 'duration';
    value: string;
  }>()
);
export const updateBreakData2 = createAction(
  '[DefineYourBreakComponent] updateBreakData2',
  props<{ groupId: string; break: BreakModel2[] }>()
);
export const initializeSameBreaks = createAction(
  '[BreakScheduleQuestion] initializeSameBreaks'
);
export const addSameBreak = createAction(
  '[DefineSameBreakComponent] addSameBreak'
);
export const updateSameBreakData = createAction(
  '[DefineSameBreakComponent] updateSameBreakData',
  props<{
    index: number;
    field: 'name' | 'day' | 'after' | 'duration';
    value: string;
  }>()
);

export const updateSameBreakData2 = createAction(
  '[DefineSameBreakComponent] updateSameBreakData2',
  props<{
    break: BreakModel2[];
  }>()
);
export const removeSameBreak = createAction(
  '[DefineSameBreakSomponent] removeSameBreak',
  props<{ breakIndex: number }>()
);
export const editCalendar = createAction(
  '[UpdateTimetableComponent] editCalendar',
  props<{ group: ClassGroupModel }>()
);
export const toggleEditClassActive = createAction(
  '[UpdateTimetableComponent] toggleEditClassActive',
  props<{ name: string }>()
);
export const toggleEditTeachingActive = createAction(
  '[UpdateTimetableComponent] toggleEditTeachingActive',
  props<TeachingDay>()
);
export const updateCalendarPeriodData = createAction(
  '[UpdateTimetableComponent] updateCalendarPeriodData',
  props<{ field: string; value: any }>()
);
export const addEditSameBreak = createAction(
  '[UpdateTimetableComponent] addEditSameBreak'
);
export const updateEditBreakData = createAction(
  '[UpdateTimetableComponent] updateEditBreakData',
  props<{
    index: number;
    field: 'title' | 'day' | 'after' | 'duration';
    value: string;
  }>()
);
export const removeEditBreak = createAction(
  '[DefineSameBreakSomponent] removeEditBreak',
  props<{ breakIndex: number }>()
);
export const setAssemblyEnabledMode = createAction(
  '[DefineSameBreakComponent] setAssemblyEnabledMode',
  props<{ isEnabled: boolean }>()
);
export const setTeachingDaysStatus = createAction(
  '[SameTeachingDaysQuestion] setTeachingDaysStatus',
  props<{ value: boolean }>()
);
export const setEditAssemblyData = createAction(
  '[AssemblyDetailsComponent] setEditAssemblyData',
  props<{ field: 'startingAt' | 'duration' | 'name'; value: number | string }>()
);
export const computeModifications = createAction(
  '[AssemblyDetailsComponent] computeModifications'
);
export const computedModifications = createAction(
  '[CalendarEffects] computedModifications',
  props<{ modifiedGroup: ClassGroupModel }>()
);
export const computeNewGroup = createAction(
  '[CalendarEffects] computeNewGroup',
  props<{ newGroup: ClassGroupModel }>()
);
export const sendCalendarData = createAction(
  '[CalendarConfirmationComponent] sendCalendarData'
  // props<{}>()
);
export const updateEditStartTime = createAction(
  '[UpdateTimetableComponent] updateEditStartTime',
  props<{ value: string; day: string }>()
);
export const updateTeachingPeriod = createAction(
  '[UpdateTimetableComponent] updateTeachingPeriod',
  props<{ value: number; day: string }>()
);
export const setSamePeriodsQuestion = createAction(
  '[SamePeriodsForClassesQuestionComponent] setSamePeriodsQuestion',
  props<{ answer: boolean }>()
);
export const setSameStartTimeStatus = createAction(
  '[SamePeriodsPerTimeComponent] setSameStartTimeStatus',
  props<{ value: boolean }>()
);
export const setHasAssemblyStatus = createAction(
  '[CommonAssemblyQuestionComponent] setHasAssemblyStatus',
  props<{ value: boolean }>()
);
export const setSameBreakScheduleStatus = createAction(
  '[BreakScheduleQuestion] setSameBreakScheduleStatus',
  props<{ value: boolean }>()
);
export const setGovernmentHolidaysStatus = createAction(
  '[GovernmentHolidaysObservedQuestionComponent] setGovernmentHolidaysStatus',
  props<{ value: boolean }>()
);
export const clearAllHolidays = createAction(
  '[GovernmentHolidaysObservedQuestionComponent] clearAllHolidays'
);
export const clearEditState = createAction(
  '[HolidayAddComponent] clearEditState'
)
export const defineSameBreakData = createAction(
  '[DefineSameBreakComponent] defineSameBreakData',
  props<{ day: string; break: BreakModel2[] }>()
)
// export const updateDayBreakData = createAction(
//   ''
// )

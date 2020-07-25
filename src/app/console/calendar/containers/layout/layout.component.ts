import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  ITimetableSavingModel,
  IClassSectionPeriodModel,
  IAcademicYear,
  TermDetailsDto
} from 'src/app/core/models/timetable';
import * as moment from 'moment';
import { map, filter, take, switchMap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable, merge } from 'rxjs';
import { CalendarModel } from 'src/app/features/calender/models/calendar.model';
import { Router } from '@angular/router';
import { ClassSectionService } from 'src/app/root-store/class-section.service';
import { ISectionModel } from 'src/app/shared/models/section.model';
import { ClassesService } from 'src/app/root-store/classes.service';
import { TimetableFacadeService } from 'src/app/services/timetable/timetable-facade.service';
import { AcademicYearService } from 'src/app/root-store/academicYear.service';
import { PopoverComponent } from 'src/app/shared/components/form-components/popover/popover.component';
import { DialogService } from 'src/app/shared/components/generic-dialog/dialog.service';
import { DeleteTermDialogComponent } from '../../components/delete-term-dialog/delete-term-dialog.component';

const DEFAULT_START_IME = '08:00';

@Component({
  selector: 'edu-console-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {
  isSkeletonLoading$ = this.timetableFacade.skeletonUI$.pipe(
    map(ui => ui.loading)
  );
  submittingTimetable$ = this.timetableFacade.UI$.pipe(
    map(ui => ui.submitting)
  );
  submittedTimetable$ = this.timetableFacade.UI$.pipe(map(ui => ui.submitted));
  isSkeletonLoaded$ = this.timetableFacade.skeletonUI$.pipe(
    map(ui => ui.loaded)
  );
  selectedClassId$ = new BehaviorSubject(null);
  selectedSectionId$ = new BehaviorSubject(null);
  refreshTimetable$ = new BehaviorSubject(false);
  classById$ = combineLatest([
    this.selectedClassId$,
    this.classService.entityMap$
  ]).pipe(
    map(([selectedClassId, entityMap]) => {
      return entityMap[selectedClassId];
    })
  );

  timetableAPIDataByClass$ = this.selectedClassId$.pipe(
    switchMap(classId => this.timetableFacade.timetableAPIDataByClass$(classId))
  );

  timetableData$ = combineLatest([
    this.timetableFacade.timetableData$,
    this.timetableAPIDataByClass$
  ]).pipe(
    map(([timetableData, timetableAPIDataByClass]) => {
      return timetableData;
    })
  );

  canSubmit$ = combineLatest([
    this.timetableFacade.timetableData$,
    this.classService.count$
  ]).pipe(
    map(([timetableData, classesCount]) => {
      let res = false;
      for (const key in timetableData) {
        if (timetableData.hasOwnProperty(key)) {
          const element = timetableData[key];
          if (element.data && element.data.length === 2) {
            res = true;
            break;
          }
        }
      }
      return res;
    })
  );

  sectionsByClassId$ = combineLatest([
    this.selectedClassId$,
    this.sectionService.entities$
  ]).pipe(
    map(([classId, sections]) => {
      return sections
        .filter(section => section.classId === classId)
        .sort((a, b) => {
          if (a.sectionName > b.sectionName) {
            return 1;
          }
          if (a.sectionName < b.sectionName) {
            return -1;
          }
          return 0;
        });
    })
  );
  classes = this.classService.entities$.pipe(
    map(classes => {
      return classes.sort((a, b) => {
        return Number(a.name) - Number(b.name);
      });
    })
  );
  sections = this.sectionService.entities$;

  teacherSearch$ = new BehaviorSubject('');
  teachers = combineLatest([
    this.timetableFacade.teachers$,
    this.teacherSearch$
  ]).pipe(
    map(([teachers, query]) => {
      if (query && query.length === 0) {
        return teachers;
      }
      return teachers.filter(
        s =>
          s.firstName.toLowerCase().includes(query) ||
          s.lastName.toLowerCase().includes(query)
      );
    })
  );

  subjectSearch$ = new BehaviorSubject('');
  subjects = combineLatest([
    this.timetableFacade.subjects$,
    this.subjectSearch$
  ]).pipe(
    map(([subjects, query]) => {
      if (query && query.length === 0) {
        return subjects;
      }
      return subjects.filter(s => s.title.toLowerCase().includes(query));
    })
  );
  subjectsError$ = this.timetableFacade.subjectsUI$.pipe(map(ui => ui.error));
  subjectsLoading$ = this.timetableFacade.subjectsUI$.pipe(
    map(ui => ui.loading)
  );
  subjectsLoaded$ = this.timetableFacade.subjectsUI$.pipe(map(ui => ui.loaded));
  periodsList$: Observable<CalendarModel[]>;
  tt = [];
  periodsData = {};
  WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  showWelcomeModal$ = new BehaviorSubject(true);

  _selectedAcademicYear$: BehaviorSubject<IAcademicYear> = new BehaviorSubject(
    null
  );

  selectedTerm$: BehaviorSubject<TermDetailsDto | string> = new BehaviorSubject(
    'All terms'
  );

  selectedTermTitle$ = this.selectedTerm$.pipe(
    map(term => {
      if (typeof term === 'string') {
        return term;
      }
      return term.termTitle;
    })
  );

  academicYears$ = this.academiYearService.entities$;
  selectedAcademicYear$ = merge(
    this.academicYears$.pipe(map(years => years[0])),
    this._selectedAcademicYear$.pipe(filter(year => Boolean(year)))
  );
  academicYearTerms$ = this.selectedAcademicYear$.pipe(
    filter(year => Boolean(year)),
    map(year => {
      return year.termDetailsDtos;
    })
  );

  optionWithRange = {
    dateRange: true
  };
  showAddTerm = false;
  dateRangeValue = null;
  constructor(
    private dialog: DialogService,
    private timetableFacade: TimetableFacadeService,
    private classService: ClassesService,
    private sectionService: ClassSectionService,
    private academiYearService: AcademicYearService
  ) {
    this.timetableFacade.resetTimetable();
    this.classService.getAll();
    this.timetableFacade.getAllPeriodsData();
    this.sectionService.getWithQuery({ pageSize: '200' });
    this.academiYearService.getWithQuery({ pageSize: '200' });
  }

  get academicYearTitle() {
    return this.selectedAcademicYear$.pipe(
      filter(year => {
        return Boolean(year);
      }),
      map(year => {
        const title = `${year.acadimicStart.split('-')[0]}`;
        return title;
      })
    );
  }

  getAcademicYearTitle(year: IAcademicYear) {
    const title = `${year.acadimicStart.split('-')[0]} - ${
      year.acadimicEnd.split('-')[0]
    }`;
    return title;
  }

  customTermTitle(term: TermDetailsDto) {
    const start = moment(term.termStart).format('DD MMM');
    const end = moment(term.termEnd).format('DD MMM');

    return `${start} - ${end}`;
  }

  ngOnInit(): void {
    this.periodsList$ = this.mapPlannerToTable();
  }

  toggleWelcomeModal() {
    this.showWelcomeModal$.next(false);
  }

  onClassClicked(id: string) {
    this.selectedSectionId$.next(null);
    this.selectedClassId$.next(id);
    this.timetableFacade.getSekeletonByClassId(id);
    this.timetableFacade.getSubjects(id);
  }

  onSectionClick(section: ISectionModel) {
    // Hacky way to force table re-render
    // Otherwise it has problems
    this.refreshTimetable$.next(true);
    this.selectedSectionId$.next(section.id);
    setTimeout(() => {
      this.refreshTimetable$.next(false);
    }, 10);
  }

  onTimetableDataUpdate(data) {
    this.timetableFacade.updateTimetableData(data);
  }

  onTeacherClicked(teacher: any) {
    console.log(teacher);
  }

  onSubjectClicked(subject: any) {
    console.log(subject);
  }

  onCreate(type: 'subject' | 'teacher') {}

  onSubjSearch(text: string) {
    this.subjectSearch$.next(text);
  }

  onTeacherSearch(text: string) {
    this.teacherSearch$.next(text);
  }

  noDrop() {
    return false;
  }

  mapPlannerToTable(): Observable<CalendarModel[]> {
    return combineLatest([
      this.timetableFacade.skeleton$,
      this.selectedClassId$,
      this.selectedSectionId$
    ]).pipe(
      filter(
        ([skeleton, classId, sectionId]) =>
          Boolean(classId) && Boolean(sectionId) && Boolean(skeleton)
      ),
      map(([skeleton, classId, sectionId]) => {
        return skeleton
          .map(day => {
            const prepareBreaks = [];
            day.breaks.forEach(breakItem => {
              const afterPeriodId =
                day.periodPlanners.find(
                  period => period.index === breakItem.endPeriod
                ) || ({} as any);

              // Add breaks with duration ONLY
              if (breakItem.breakDuration != 0) {
                prepareBreaks.push({
                  name: breakItem.breakTitle,
                  firstBreak: '',
                  day: '',
                  after: `${classId}--${sectionId}--${afterPeriodId.id}`,
                  duration: String(breakItem.breakDuration)
                });
              }
            });
            const assemblyDuration = day.assemblyDuration;
            const assemblyStartTime = day.assemblyStartTime;
            return {
              day: day.weekday.substring(0, 3),
              periods: day.periodPlanners.map(period => {
                this.periodsData[`${classId}--${sectionId}--${period.id}`] = [];
                return `${classId}--${sectionId}--${period.id}`;
              }),
              startTime:
                day.periodStartTime ||
                this.addTime(assemblyStartTime, {
                  minutes: assemblyDuration
                }) ||
                DEFAULT_START_IME,
              periodDuration: String(day.periodPlanners[0].duration),
              intervaBtwPeriods: '0',
              breaks: prepareBreaks,
              assembly: {
                name: day.assemblyTitle || 'Assembly',
                startingAt: assemblyStartTime,
                duration: String(assemblyDuration)
              }
            };
          })
          .sort(this.sortByDay.bind(this));
      }),
      map(mappedCalendarData => {
        const dayClone = mappedCalendarData.slice(0, 1)[0];
        if (!dayClone) {
          return mappedCalendarData;
        }
        const extendedCalendarData = [];
        this.WEEKDAYS.forEach(day => {
          const existinCalendarData = mappedCalendarData.find(
            data => data.day === day
          );
          if (existinCalendarData) {
            extendedCalendarData.push(existinCalendarData);
          } else {
            extendedCalendarData.push({
              ...dayClone,
              day,
              periods: new Array(dayClone.periods.length).fill(''),
              breaks: []
            });
          }
        });
        return extendedCalendarData;
      })
    );
  }

  sortByDay(a: any, b: any) {
    const list = this.WEEKDAYS;
    if (list.indexOf(a.day) > list.indexOf(b.day)) {
      return 1;
    }
    if (list.indexOf(a.day) < list.indexOf(b.day)) {
      return -1;
    }
    return 0;
  }

  addTime(target: string, time: { hours?: number; minutes?: number }) {
    if (!target) {
      return null;
    }
    return moment(target, 'HH:mm')
      .add(time.minutes, 'm')
      .format('HH:mm');
  }

  onSaveTimetable() {
    this.timetableFacade.timetableData$
      .pipe(take(1))
      .subscribe(timetableData => {
        const keys = Object.keys(timetableData);
        if (keys.length > 0) {
          let res: {
            [key: string]: IClassSectionPeriodModel;
          } = {};
          keys.forEach(key => {
            const [classId, sectionId, periodId] = key.split('--');
            const item = timetableData[key];
            const existingClass = res[`${classId}--${sectionId}`];
            const subject = item.data.find(d => Boolean(d.id));
            const teacher = item.data.find(d => Boolean(d.profileId));
            if (existingClass) {
              const periods = existingClass.periodRequestQ || [];
              const periodRequest =
                teacher && subject
                  ? {
                      periodId,
                      subjectId: (item.data.find(d => Boolean(d.id)) || {}).id,
                      teacherId: (
                        item.data.find(d => Boolean(d.profileId)) || {}
                      ).profileId
                    }
                  : null;
              res = {
                ...res,
                [`${classId}--${sectionId}`]: {
                  classId,
                  sectionId,
                  periodRequestQ: periodRequest
                    ? periods.concat(periodRequest)
                    : periods
                }
              };
            } else {
              const firstPeriodRequest =
                teacher && subject
                  ? [
                      {
                        periodId,
                        subjectId: (subject || {}).id,
                        teacherId: (teacher || {}).profileId
                      }
                    ]
                  : [];
              res = {
                ...res,
                [`${classId}--${sectionId}`]: {
                  classId,
                  sectionId,
                  periodRequestQ: firstPeriodRequest
                }
              };
            }
          });

          console.log('Data to submit');
          const dataToSubmit = Object.values(res).reduce((result, item) => {
            const existingClass =
              result[item.classId] || ({} as ITimetableSavingModel);
            const sectionList = existingClass.sectionList || [];
            return {
              ...result,
              [item.classId]: {
                ...existingClass,
                classId: item.classId,
                sectionList: sectionList.concat({
                  sectionId: item.sectionId,
                  periodRequestQ: item.periodRequestQ
                })
              }
            };
          }, {} as { [key: string]: ITimetableSavingModel });
          console.log(Object.values(dataToSubmit));
          this.timetableFacade.submitTimetable(Object.values(dataToSubmit));
        }
      });
  }

  addNewSection(list: any[], section: any) {
    return list.concat(section);
  }
  replaceSection(list: any[], section: any) {
    return list.map(l => {
      if (l.sectionId === section.sectionId) {
        return section;
      }
      return l;
    });
  }

  fetchSubjectsTeachers() {
    this.timetableFacade.getSubjects(this.selectedClassId$.value);
  }

  onSelectYear(year: IAcademicYear, popover: PopoverComponent) {
    this._selectedAcademicYear$.next(year);
    this.selectedTerm$.next('All terms');
    popover.togglePopoverState();
  }

  onSelectTerm(term: TermDetailsDto | string, popover: PopoverComponent) {
    if (typeof term === 'string') {
      this.selectedTerm$.next(term);
    } else {
      this.selectedTerm$.next(term);
    }
    popover.togglePopoverState();
  }

  onAddTerm() {
    this.showAddTerm = true;
  }

  onDateRangeChange(data) {
    console.log(data);
    this.dateRangeValue = data;
  }

  onClose() {
    console.log('closed');
    this.showAddTerm = false;
    this.dateRangeValue = null;
  }

  onSaveTermDates() {
    console.log('save term');
    const [start, end] = this.dateRangeValue.split(' - ');
    this.selectedAcademicYear$.pipe(take(1)).subscribe(res => {
      const newTerm = {
        academicYearId: res.id,
        priority: 0,
        termEnd: end,
        termStart: start,
        termTitle: null
      };
      this.academiYearService.update({
        ...res,
        noOfTerm: res.noOfTerm + 1,
        termDetailsDtos: res.termDetailsDtos.concat(newTerm)
      });
    });

    this.showAddTerm = false;
    this.dateRangeValue = null;
  }

  onRemoveTerm(
    term: TermDetailsDto,
    indexToRemove: number,
    terms: TermDetailsDto[]
  ) {
    console.log(term);
    const termsWithoutDeleted = terms.filter((t, i) => i !== indexToRemove);
    const dialogRef = this.dialog.open(DeleteTermDialogComponent, {
      data: {
        term,
        terms: termsWithoutDeleted,
        index: indexToRemove
      }
    });
    dialogRef.afterClosed().subscribe((termToExtend: TermDetailsDto | null) => {
      if (termToExtend) {
        const termDetailsDtos = this.prepareTermsToSave(
          term,
          terms,
          termToExtend,
          indexToRemove
        );
        console.log(termDetailsDtos);
        // this.selectedAcademicYear$.pipe(take(1)).subscribe(res => {
        //   this.academiYearService.update({
        //     ...res,
        //     noOfTerm: termDetailsDtos.length,
        //     termDetailsDtos
        //   });
        // });
      }
    });
  }
  onEditTerm(term: TermDetailsDto, index: number, terms: TermDetailsDto[]) {
    console.log(term);
  }

  prepareTermsToSave(
    term: TermDetailsDto,
    terms: TermDetailsDto[],
    termToExtend: TermDetailsDto,
    indexToRemove: number
  ) {
    const termToExtendIndex = terms.findIndex(
      t => termToExtend.termId === t.termId
    );
    let res: TermDetailsDto[] = [];

    if (indexToRemove === 0) {
      /**
       * If removed Term is first element
       * We remove all terms in between Removed Term and TermToExtend
       * and set termStart of TermToExtend to be equal to Removed term termStart
       */
      return terms.slice(termToExtendIndex).map((t, i) => {
        if (i === 0) {
          return {
            ...t,
            termStart: term.termStart
          };
        }
        return t;
      });
    }

    if (indexToRemove === terms.length - 1) {
      /**
       * If removed Term is Last element
       * We remove all terms in between Removed Term and TermToExtend
       * and set termEnd of TermToExtend to be equal to Removed term termEnd
       */
      res = terms.slice().splice(0, termToExtendIndex + 1);
      return res.map((t, i) => {
        if (i === res.length - 1) {
          return {
            ...t,
            termEnd: term.termEnd
          };
        }
        return t;
      });
    }

    if (indexToRemove > 0 && indexToRemove < termToExtendIndex) {
      const termsBeforeRemoved: TermDetailsDto[] = terms
        .slice()
        .splice(0, indexToRemove);
      const termsAfterExtended: TermDetailsDto[] = terms
        .slice()
        .splice(termToExtendIndex)
        .map((t, i) => {
          if (i === 0) {
            return {
              ...t,
              termStart: term.termStart
            };
          }
          return t;
        });

      return termsBeforeRemoved.concat(termsAfterExtended);
    }

    if (indexToRemove > 0 && indexToRemove > termToExtendIndex) {
      const termsBeforeExtended: TermDetailsDto[] = terms
        .slice()
        .splice(0, termToExtendIndex);
      const termsAfterRemoved: TermDetailsDto[] = terms
        .slice()
        .splice(indexToRemove + 1)
        .map((t, i) => {
          if (i === 0) {
            return {
              ...t,
              termStart: term.termStart
            };
          }
          return t;
        });

      const extended = {
        ...terms[termToExtendIndex],
        termEnd: term.termEnd
      };

      return [...termsBeforeExtended, extended].concat(termsAfterRemoved);
    }
  }
}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { StaffsCommunicatorService } from 'src/app/features/staffs/services/staffs-communication.service';
import { DialogService } from 'src/app/shared/components/generic-dialog/dialog.service';
import * as moment from 'moment';
import { CalendarModel } from '../../component/timetable/data';
import { ClassesService } from 'src/app/root-store/classes.service';
import { ClassSectionService } from 'src/app/root-store/class-section.service';
import { map, filter, take } from 'rxjs/operators';
import { ISectionModel } from 'src/app/shared/models/section.model';
import { TimetableFacadeService } from '../../services/timetable-facade.service';
import {
  IClassSectionPeriodModel,
  ITimetableSavingModel
} from 'src/app/core/models/timetable';
import { Router } from '@angular/router';
import { SubjectFormDialogComponent } from '../../component/subject-form-dialog/subject-form-dialog.component';

const DEFAULT_START_IME = '08:00';

@Component({
  selector: 'edu-timetable-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [StaffsCommunicatorService]
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
  constructor(

    private dialog: DialogService,
    private router: Router,
    private timetableFacade: TimetableFacadeService,
    private classService: ClassesService,
    private sectionService: ClassSectionService
  ) {
    this.timetableFacade.resetTimetable();
    this.classService.getAll();
    this.sectionService.getWithQuery({ pageSize: '200' });
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

  onTeacherClicked(teacher: any) {
    console.log(teacher);
  }

  onSubjectClicked(subject: any) {
    console.log(subject);
  }

  onCreate(type: 'subject' | 'teacher') {
    if (type === 'subject') {
      console.log('add new subject');
      this.dialog.open(SubjectFormDialogComponent);
    }
  }

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
          // this.timetableFacade.submitTimetable(Object.values(dataToSubmit));
        }
      });
  }

  // onSaveTimetable() {
  //   this.timetableFacade.timetableData$
  //     .pipe(take(1))
  //     .subscribe(timetableData => {
  //       const keys = Object.keys(timetableData);
  //       if (keys.length > 0) {
  //         let res: {
  //           [key: string]: IClassSectionPeriodModel;
  //         } = {};
  //         keys.forEach(key => {
  //           const [classId, sectionId, periodId] = key.split('--');
  //           const item = timetableData[key];
  //           const existingClass = res[`${classId}`];
  //           const subject = item.data.find(d => Boolean(d.id));
  //           const teacher = item.data.find(d => Boolean(d.profileId));
  //           const periodRequest =
  //             teacher && subject
  //               ? {
  //                   periodId,
  //                   subjectId: (item.data.find(d => Boolean(d.id)) || {}).id,
  //                   teacherId: (item.data.find(d => Boolean(d.profileId)) || {})
  //                     .profileId
  //                 }
  //               : null;

  //           if (existingClass) {
  //             const sectionList = existingClass.sectionList || [];
  //             let existingSection = sectionList.find(
  //               list => list.sectionId === sectionId
  //             );
  //             let newSection;

  //             if (existingSection) {
  //               if (periodRequest) {
  //                 existingSection = {
  //                   ...existingSection,
  //                   periodRequestQ: existingSection.periodRequestQ.concat(
  //                     periodRequest
  //                   )
  //                 };
  //               }
  //             } else {
  //               newSection = {
  //                 periodRequestQ: periodRequest ? [periodRequest] : [],
  //                 sectionId
  //               };
  //             }

  //             res[`${classId}`] = {
  //               ...existingClass,
  //               sectionList: newSection
  //                 ? this.addNewSection(existingClass.sectionList, newSection)
  //                 : this.replaceSection(
  //                     existingClass.sectionList,
  //                     existingSection
  //                   )
  //             };
  //           } else {
  //             const firstPeriodRequest = periodRequest ? [periodRequest] : [];
  //             res = {
  //               ...res,
  //               [`${classId}`]: {
  //                 classId,
  //                 sectionList: [
  //                   {
  //                     sectionId,
  //                     periodRequestQ: firstPeriodRequest
  //                   }
  //                 ]
  //               }
  //             };
  //           }
  //         });

  //         console.log('Data to submit');
  //         console.log(Object.values(res));
  //         // Object.values(res).forEach(timetable =>
  //         //   this.timetableFacade.submitTimetable(timetable)
  //         // );
  //       }
  //     });
  // }

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

  goToDashboard() {
    this.router.navigateByUrl('/dashboard');
  }
}

import { ClassModel } from 'src/app/shared/models/class.model';
import { ClassGroupModel } from '../models/class-group.model';
import { PeriodModel } from '../models/period.model';
import { PeriodsPerDayComponent } from '../components/periods-per-day/periods-per-day.component';
import { DayModel } from '../models/day.model';
import { CalendarModel } from '../models/calendar.model';
import { CalendarUpdateModel } from '../models/calendar-update.model';

export function clearClassOffGroups(
  classItem: ClassModel,
  groups: ClassGroupModel[],
  skipGroupId: string
) {
  console.log(groups);
  return groups
    .map(group => {
      if (skipGroupId) {
        if (group.id !== skipGroupId) {
          const filteredClasses = group.classes
            .map(groupClassItem => {
              if (classItem.id === groupClassItem.id) {
                return undefined;
              }
              return groupClassItem;
            })
            .filter(item => item);
          group.classes = filteredClasses;
        }
      }
      return group;
    })
    .filter(group => group.classes.length > 0);
}
export function periodUniformity(periods: PeriodModel[][]) {
  for (let i = 0; i < periods.length; i++) {
    if (periods[i + 1]) {
      if (periods[i].length != periods[i + 1].length) {
        return false;
      }
      const len = periods[i].length;
      for (let j = 0; j < len; j++) {
        if (
          periods[i][j].day !== periods[i + 1][j].day ||
          periods[i][j].periods.length !== periods[i + 1][j].periods.length ||
          periods[i][j].startTime !== periods[i + 1][j].startTime
        ) {
          return false;
        }
      }
    }
  }
  return true;
}

export function generatePeriodFromNumber(num: number) {
  const periodArr = [];
  for (let i = 1; i <= num; i++) {
    periodArr.push('P' + i);
  }
  return periodArr;
}

export function buildRangePipe(items: number[]) {
  const res: { start: number; end?: number }[] = [];
  let currentIdx = 0;
  for (let i = 0; i < items.length; i++) {
    if (i === 0) {
      res.push({ start: items[0] });
    } else if (items[i] - 1 === items[i - 1]) {
      res[currentIdx].end = items[i];
    } else {
      res.push({ start: items[i], end: null });
      currentIdx += 1;
    }
  }

  return res.reduce((prev, curr, idx, arr) => {
    if (curr.start && curr.end) {
      if (arr.length - 1 !== idx) {
        if (curr.end - curr.start > 1) {
          return (prev += `${curr.start}-${curr.end}|`);
        }else if (curr.end - curr.start === 1) {
          return (prev += `${curr.start}|${curr.end}|`);
        }
        return (prev += `${curr.start}|${curr.end}|`);
      }
      if (curr.end - curr.start === 1) {
        return (prev += `${curr.start}|${curr.end}`);
      }
      return (prev += `${curr.start}-${curr.end}`);
    } else if (curr.start && !curr.end) {
      return (prev += `${curr.start}`);
    }
  }, '');
}

export function getOrphanedClasses(
  allClasses: ClassModel[],
  classesAndGroups: ClassGroupModel[]
) {
  let orphanedClasses: ClassModel[] = [];
  allClasses.forEach(classItem => {
    let classFound: boolean;
    for (let i = 0; i < classesAndGroups.length; i++) {
      for (let j = 0; j < classesAndGroups[i].classes.length; j++) {
        if (classItem.id === classesAndGroups[i].classes[j].id) {
          classFound = true;
          break;
        }
      }
      if (classFound) {
        break;
      }
    }
    if (!classFound) {
      orphanedClasses.push(classItem);
    }
  });
  return orphanedClasses;
}

export function areBothClassesEqual(
  classesA: ClassModel[],
  classesB: ClassModel[]
) {
  if (classesA.length === classesB.length) {
    for (let i = 0; i < classesA.length; i++) {
      if (!classesB.find(item => item.id === classesA[i].id)) {
        return false;
      }
    }
    return true;
  }
  return false;
}
export function findModifiedClassesFromGroups(
  classes: ClassModel[],
  classesGroups: ClassGroupModel[]
) {
  const modifiedClasses: {
    classItem: ClassModel;
    group: ClassGroupModel;
  }[] = [];
  for (let i = 0; i < classes.length; i++) {
    for (let j = 0; j < classesGroups.length; j++) {
      const match = classesGroups[j].classes.findIndex(
        classItem => classItem.id === classes[i].id
      );
      if (match > -1) {
        modifiedClasses.push({
          classItem: classesGroups[j].classes[match],
          group: classesGroups[j]
        });
        break;
      }
    }
  }
  return modifiedClasses;
}
interface ModifiedClasses {
  classItem: ClassModel;
  group: ClassGroupModel;
}
export function computeDifference(
  modifiedClass: ClassModel,
  originalClass: ClassModel,
  oldClassesAndGroups
) {
  // const modifiedTeachingDays = modifiedClass.
}
export function computeChanges(
  modifiedClasses: ModifiedClasses[],
  editState: CalendarUpdateModel
) {
  let changes: {
    classObj: ClassModel;
    teachingDays: Array<string>;
  }[] = [];
  // Abstract to own function
  for (let i = 0; i < modifiedClasses.length; i++) {
    const previousTeachingDays = modifiedClasses[i].group.teachingDays.filter(
      teachingDay => teachingDay.selected
    );
    const currentTeachingDays = editState.teachingDays.filter(
      teachingDay => teachingDay.selected
    );
    if (previousTeachingDays.length !== currentTeachingDays.length) {
      setTeachingDays(changes, modifiedClasses, i, currentTeachingDays);
    } else {
      if (isUniform(previousTeachingDays, currentTeachingDays)) {
        changes.push({
          classObj: modifiedClasses[i].classItem,
          teachingDays: null
        });
      } else {
        setTeachingDays(changes, modifiedClasses, i, currentTeachingDays);
      }
    }

    const previousTeachingPeriods = modifiedClasses[i].group.periods.filter(
      period => period.periods.length
    );
    const currentTeachingPeriods = editState.teachingPeriods.filter(
      period => period.periods.length
    );
    setTeachingPeriods(changes, modifiedClasses, i, currentTeachingPeriods);
  }

  return changes;
}
function setTeachingDays(
  changes,
  modifiedClasses: ModifiedClasses[],
  idx,
  currentTeachingDays
) {
  const changeIdx = changes.findIndex(
    change => change.classObj.id === modifiedClasses[idx].classItem.id
  );
  if (changeIdx < 0) {
    changes.push({
      classObj: modifiedClasses[idx].classItem,
      teachingDays: currentTeachingDays.map(day => day.day)
    });
  } else {
    changes[changeIdx].teachingDays = currentTeachingDays.map(day => day.day);
  }
}
function setTeachingPeriods(
  changes,
  modifiedClasses: ModifiedClasses[],
  idx,
  currentTeachingPeriods
) {}
function isUniform(previous, current) {
  for (let i = 0; i < previous.length; i++) {
    let found = false;
    for (let j = 0; j < current.length; j++) {
      if (previous[i].day === current[j].day) {
        found = true;
        break;
      }
    }
    if (found === false) {
      return false;
    }
  }
  return true;
}
export function getSubtractedClasses(
  group: ClassGroupModel,
  classes: ClassModel[]
) {
  const subtractedClasses: ClassModel[] = [];
  for (let i = 0; i < group.classes.length; i++) {
    let index = classes.findIndex(
      classItem => classItem.id === group.classes[i].id
    );
    if (index < 0) {
      subtractedClasses.push(group.classes[i]);
    }
  }
  return subtractedClasses;
}
export function removeAssembly(periods: PeriodModel[]) {
  return periods.map(period => {
    delete period.assembly;
    return period;
  });
}
export function inRange(date: Date, lowerBound: Date, upperBound: Date) {
  return (
    date.getTime() >= lowerBound.getTime() &&
    date.getTime() <= upperBound.getTime()
  );
}
export function isGreater(date: Date, lowerBound: Date) {
  return date.getTime() > lowerBound.getTime();
}
export function isEqual(dateA: Date, dateB: Date) {
  return dateA.getTime() === dateB.getTime();
}
export function validateTermsAndDates(
  termsAndDatesForm,
  termsAndDates: CalendarModel,
  index,
  field
) {
  const startDate = termsAndDatesForm.value.startDate;
  const endDate = termsAndDatesForm.value.endDate;
  let errors = {
    msg: []
  };
  if (!startDate || startDate.length === 0) {
    errors.msg.push(`${field} ${index + 1}'s Start Date is Empty`);
  }
  if (!endDate || endDate.length === 0) {
    errors.msg.push(`${field} ${index + 1}'s End Date is Empty`);
  }
  if (startDate && startDate.length && endDate && endDate.length) {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const academicStart = new Date(termsAndDates.currentAcademicYear.startDate);
    const academicEnd = new Date(termsAndDates.currentAcademicYear.endDate);
    if (startDateObj.getTime() >= endDateObj.getTime()) {
      errors.msg.push('End Date must be more than start date');
    }
    if (!inRange(startDateObj, academicStart, academicEnd)) {
      errors.msg.push(`${field} ${index + 1}'s start time is out of range`);
    }
    if (!inRange(endDateObj, academicStart, academicEnd)) {
      errors.msg.push(`${field} ${index + 1}'s end time is out of range`);
    }
    if (index > 0) {
<<<<<<< HEAD
      console.log(termsAndDates.termsAndDates);
=======
      // console.log(termsAndDates.termsAndDates)
>>>>>>> acc2659b8ba686b436a014266aa92a760ccea0b3
      const previousEndDate = new Date(
        termsAndDates.termsAndDates[index - 1].endDate
      );
      if (!isGreater(startDateObj, previousEndDate)) {
        errors.msg.push(
          `${field} ${index + 1}'s start time overlaps with ${field} ${index}`
        );
      } else {
<<<<<<< HEAD
        console.log(startDateObj.getTime(), previousEndDate.getTime());
      }
    }
  }
  console.log(errors);
=======
        // console.log(startDateObj.getTime(), previousEndDate.getTime())
      }
    }
  }
  // console.log(errors);
>>>>>>> acc2659b8ba686b436a014266aa92a760ccea0b3
  if (!errors.msg.length) {
    errors = null;
  }
  return errors;
}

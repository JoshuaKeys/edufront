import { ClassModel } from 'src/app/shared/models/class.model';
import { ClassGroupModel } from '../models/class-group.model';
import { PeriodModel } from '../models/period.model';
import { PeriodsPerDayComponent } from '../components/periods-per-day/periods-per-day.component';
import { DayModel } from '../models/day.model';

export function clearClassOffGroups(classItem: ClassModel, groups: ClassGroupModel[], skipGroup: ClassGroupModel) {
    return groups.map(group=> {
        if(group.id !== skipGroup.id) {
            const filteredClasses = group.classes.map(groupClassItem=> {
                if(classItem.id === groupClassItem.id) {
                    return undefined;
                }
                return groupClassItem
            }).filter(item => item)
            group.classes = filteredClasses
        }
        return group;
    })
}
export function periodUniformity(periods: PeriodModel[][]) {
    for(let i = 0; i < periods.length; i++) {
        if(periods[i + 1]) {
            if(periods[i].length != periods[i+1].length) {
                return false;
            }
            const len = periods[i].length;
            for(let j = 0; j < len; j++) {
                if(
                    periods[i][j].day !== periods[i+1][j].day ||
                    periods[i][j].periods.length !== periods[i+1][j].periods.length ||
                    periods[i][j].startTime !== periods[i+1][j].startTime
                    ) {
                        return false
                    }
            }
        }
    }
    return true;
}

export function generatePeriodFromNumber(num: number) {
    const periodArr = [];
    for(let i = 1; i <= num; i++) {
        periodArr.push('P'+i);
    }
    return periodArr;
}

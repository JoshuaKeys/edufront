import { createReducer, on } from '@ngrx/store';
import { ClassGroupModel } from '../../models/class-group.model';
import { fetchClassesAndGroupsSuccess, toggleClassesGroupActive, reassignClass } from '../actions/calendar.actions';
import { clearClassOffGroups } from '../../utilities';

function genKey() {
    let alphaNum = 'abcdefghijklmnopqrstuvwxyz'
    let res = ''
    for(let i = 0; i < 24; i++){
        res += alphaNum[Math.floor(Math.random() + 26)];
    }
    return res;
}

const initialState: ClassGroupModel[] = [];
export const classesAndGroupsReducer = createReducer(
    initialState,
    on(fetchClassesAndGroupsSuccess, (state, action)=> {
        return action.classesAndGroups
    }),
    on(toggleClassesGroupActive, (state, action)=> {
        const classGroupIdx = state.findIndex(classGroupItem => classGroupItem.id === action.classesGroup.id);
        const stateCopy: ClassGroupModel[] = JSON.parse(JSON.stringify(state));
        const teachingDayIdx = stateCopy[classGroupIdx].teachingDays.findIndex(teachingDay=> teachingDay.day === action.day.day);
        stateCopy[classGroupIdx].teachingDays[teachingDayIdx].selected = !stateCopy[classGroupIdx].teachingDays[teachingDayIdx].selected;
        return stateCopy;
    }),
    on(reassignClass, (state, action) => {
        const stateCopy: ClassGroupModel [] = JSON.parse(JSON.stringify(state));

        const groupIdx = stateCopy.findIndex(groupItem => groupItem.id === action.classesGroup.id);
        const clickedClassIdx = stateCopy[groupIdx].classes.findIndex(classItem => classItem.id === action.class.id);
        if(clickedClassIdx > -1) {
            stateCopy[groupIdx].classes.splice(clickedClassIdx, 1)
            if(stateCopy[groupIdx].classes.length === 0) {
                stateCopy.splice(groupIdx, 1)
            }
        }else {
            stateCopy[groupIdx].classes.push(action.class)
        }
        const adjustedGroups = clearClassOffGroups(action.class, stateCopy, action.classesGroup)
        return adjustedGroups
    }),
    // on()
)
import { createReducer, on } from '@ngrx/store';
import { TeachingDay } from '../../models/teaching-day.model';
import { toggleSelectedDay, setDefaultTeachingDays } from '../actions/calendar.actions';

const initialState: TeachingDay[] = [
    {day: 'Mon', selected: false},
    {day: 'Tue', selected: false},
    {day: 'Wed', selected: false},
    {day: 'Thu', selected: false},
    {day: 'Fri', selected: false},
    {day: 'Sat', selected: false},
    {day: 'Sun', selected: false}
]
export const teachingDaysReducer = createReducer(initialState,
    on(setDefaultTeachingDays, (state, action)=> {
        const stateCopy: TeachingDay[] = JSON.parse(JSON.stringify(state));
        for(let i = 0; i < 5; i++) {
            stateCopy[i].selected = true;
        }
        return stateCopy;
    }),
    on(toggleSelectedDay, (state, action)=> {
        const dayIdx = state.findIndex(dayItem => dayItem.day === action.day.day);
        const stateCopy: TeachingDay[] = JSON.parse(JSON.stringify(state));

        stateCopy[dayIdx].selected = !stateCopy[dayIdx].selected;
        return stateCopy;
    })
)
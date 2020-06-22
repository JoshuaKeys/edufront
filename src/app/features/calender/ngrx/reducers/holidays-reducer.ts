import { createReducer, on, combineReducers } from '@ngrx/store';
import { createEntityAdapter } from '@ngrx/entity';
import { HolidayModel } from '../../models/holiday.model';
import { fetchHolidaysResponse, deleteHoliday, editHolidayRequest, addHoliday } from '../actions/calendar.actions';

const holidayAdapter = createEntityAdapter<HolidayModel>({
    selectId: (state)=> {
        return state.date
    }
})
const initialState = holidayAdapter.getInitialState();

export const holidayListReducer = createReducer(initialState, 
    on(fetchHolidaysResponse, (state, action)=> {
        return holidayAdapter.addAll(action.holidays.content, state);
    }),
    on(deleteHoliday, (state, action)=> holidayAdapter.removeOne(action.holiday.id, state)),
    on(addHoliday, (state, action)=> {
        const hasId = holidayAdapter.getSelectors().selectIds(state).findIndex(holidayId => holidayId === action.holiday.date);
        if(hasId > -1) {
            return state;
        }
        return holidayAdapter.addOne(action.holiday, state)
    })
);
const editState: {
    editedHoliday: HolidayModel
} = {
    editedHoliday: null
}
export const holidayEditReducer = createReducer(editState,
    on(editHolidayRequest, (state, action)=> {
        return {
            ...state,
            editedHoliday: {
                ...action.holiday
            }
        }
    })
);
export const holidayReducer = combineReducers({
    holidayList: holidayListReducer,
    holidayEdit: holidayEditReducer,
})
export const { selectAll } = holidayAdapter.getSelectors();
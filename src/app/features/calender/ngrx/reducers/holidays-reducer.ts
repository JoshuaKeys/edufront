import { createReducer, on, combineReducers } from '@ngrx/store';
import { createEntityAdapter } from '@ngrx/entity';
import { HolidayModel } from '../../models/holiday.model';
import { fetchHolidaysResponse, deleteHoliday, editHolidayRequest } from '../actions/calendar.actions';

const holidayAdapter = createEntityAdapter<HolidayModel>()
const initialState = holidayAdapter.getInitialState();

export const holidayListReducer = createReducer(initialState, 
    on(fetchHolidaysResponse, (state, action)=> {
        return holidayAdapter.addAll(action.holidays.content, state);
    }),
    on(deleteHoliday, (state, action)=> holidayAdapter.removeOne(action.holiday.id, state))
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
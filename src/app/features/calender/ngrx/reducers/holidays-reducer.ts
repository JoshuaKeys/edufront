import { createReducer, on, combineReducers } from '@ngrx/store';
import { createEntityAdapter, Update } from '@ngrx/entity';
import { HolidayModel } from '../../models/holiday.model';
import { fetchHolidaysResponse, deleteHoliday, editHolidayRequest, addHoliday, editHoliday, editHolidaySuccess } from '../actions/calendar.actions';

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
    on(deleteHoliday, (state, action)=> holidayAdapter.removeOne(action.holiday.date, state)),
    on(addHoliday, (state, action)=> {
        const hasId = holidayAdapter.getSelectors().selectIds(state).findIndex(holidayId => holidayId === action.holiday.date);
        if(hasId > -1) {
            return state;
        }
        return holidayAdapter.addOne(action.holiday, state)
    }),
    on(editHolidaySuccess, (state, action)=> {
        const update: Update<HolidayModel> = {
            id: action.holiday.date,
            changes: {
                ...action.holiday
            }
        }
        return holidayAdapter.updateOne(update, state);
    })
);
const editState: {
    editedHoliday: HolidayModel
} = {
    editedHoliday: null
}
export const holidayEditReducer = createReducer(editState,
    on(editHolidayRequest, (state, action)=> {
        console.log(action.holiday)
        return {
            ...state,
            editedHoliday: {
                ...action.holiday
            }
        }
    }),
    on(editHolidaySuccess, (state, action)=> {
        return {
            ...state,
            editedHoliday: null
        }
    })
);
export const holidayReducer = combineReducers({
    holidayList: holidayListReducer,
    holidayEdit: holidayEditReducer,
})
export const { selectAll } = holidayAdapter.getSelectors();
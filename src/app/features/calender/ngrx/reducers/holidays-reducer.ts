import { createReducer, on, combineReducers } from '@ngrx/store';
import { createEntityAdapter, Update } from '@ngrx/entity';
import { HolidayModel } from '../../models/holiday.model';
import { fetchHolidaysResponse, deleteHoliday, editHolidayRequest, addHoliday, editHoliday, editHolidaySuccess } from '../actions/calendar.actions';
import { v4 as uuid44 } from 'uuid';
const holidayAdapter = createEntityAdapter<HolidayModel>({
  selectId: (state) => {
    return state.mockId
  }
})
const initialState = holidayAdapter.getInitialState();

export const holidayListReducer = createReducer(initialState,
  on(fetchHolidaysResponse, (state, action) => {
    const holidayCopy = JSON.parse(JSON.stringify(action.holidays.content))
    const holidaysAndIds = holidayCopy.map(holiday => {
      holiday.mockId = uuid44()
      return holiday
    })
    return holidayAdapter.addAll(holidaysAndIds, state);
  }),
  on(deleteHoliday, (state, action) => holidayAdapter.removeOne(action.holiday.mockId, state)),
  on(addHoliday, (state, action) => {
    const hasId = holidayAdapter.getSelectors().selectIds(state).findIndex(holidayId => holidayId === action.holiday.mockId);
    const stateCopy = JSON.parse(JSON.stringify(state));
    const holiday = JSON.parse(JSON.stringify(action.holiday));
    holiday.mockId = uuid44();
    if (hasId > -1) {
      return state;
    }
    return holidayAdapter.addOne(holiday, state)
  }),
  on(editHolidaySuccess, (state, action) => {
    const holiday = JSON.parse(JSON.stringify(action.holiday));
    const update: Update<HolidayModel> = {
      id: action.holiday.mockId,
      changes: {
        ...holiday
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
  on(editHolidayRequest, (state, action) => {
    console.log(action.holiday)
    return {
      ...state,
      editedHoliday: {
        ...action.holiday
      }
    }
  }),
  on(editHolidaySuccess, (state, action) => {
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

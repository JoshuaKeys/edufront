import { createReducer, on } from '@ngrx/store';
import { CalendarModalModel } from '../../models/calender-modal.model';
import * as calenderActions from '../actions'
const initialState: CalendarModalModel = {
    startModal: true
}
export const calenderModalReducer = createReducer(initialState,
    on(calenderActions.toggleStartModal, (state, action)=> {
        return {
            ...state,
            startModal: !state.startModal
        }
    })
);

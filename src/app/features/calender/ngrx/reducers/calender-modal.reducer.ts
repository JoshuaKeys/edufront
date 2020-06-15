import { createReducer } from '@ngrx/store';
import { CalenderModalModel } from '../../models/calender-modal.model';

const initialState: CalenderModalModel = {
    startModal: true
}
export const calenderModalReducer = createReducer(initialState)

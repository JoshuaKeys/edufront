import { createReducer, on } from '@ngrx/store';
import { ClassModel } from 'src/app/shared/models/class.model';
import { getAllClassesResponse } from '../actions/calendar.actions';

const initialState: ClassModel[] = [];
export const classesReducer = createReducer(initialState,
    on(getAllClassesResponse, (state, action)=> {
        return action.classes;
    })    
);